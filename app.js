// Utility Imports.  
var express = require('express.io');
var session = require('express-session');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
React = require('react');

// Route Imports.
var base = require('./routes/base');

// Environment Variables.
var mongoURI = process.env.MONGOURI || "mongodb://localhost/test";
var PORT = process.env.PORT || 3000;
mongoose.connect(mongoURI);

// Model imports.
Playlist = require('./models/playlist');

// Config.
var app = express();

// Connect socket.io
app.http().io();
io = app.io;

// Passport for Facebook authentication.
var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

var StrellofyUser = require("./models/strellofyUser");
passport.use(new FacebookStrategy({
    clientID: process.env.STRELLOFY_APP_ID,
    clientSecret: process.env.STRELLOFY_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    StrellofyUser.findOrCreate({
      profile_id: profile.id,
    }, {
      name: profile.name,
    }, function(err, user) {
      if (err) { return done(err); } 
      done(null, user);
    });
  }
));

// Middleware.
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// API Routing Table.

// GET.
// Redirect the user to Facebook for authentication.  When complete, Facebook will redirect the user back to the application at /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval. Finish the authentication process by attempting to obtain an access token. If access was granted, the user will be logged in. Otherwise, authentication has failed.
app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { 
    successRedirect: '/#/home', 
    failureRedirect: '/' 
  }));

function ensureAuthenticated(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// POST.
app.post('/find_or_create_room', ensureAuthenticated, base.find_or_create_room);
app.post('/add_song', ensureAuthenticated, base.add_song);
app.post('/reorder_queue', ensureAuthenticated, base.reorder_queue);

app.listen(PORT);
