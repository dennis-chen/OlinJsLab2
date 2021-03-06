// YouTrello.
// App that combines Youtube and Trello.
// Uses Facebook authentication.
// Group create and play music together at the same time for a good time :D

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
    callbackURL: "http://youtrello.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {

    // FIXME Don't hardcode this. Define in the Schema.
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

var favicon = require('serve-favicon');

// Middleware.
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(__dirname + '/public/images/favicon.ico'));
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
    // TODO Make this AJAX in the future.
    successRedirect: '/', 
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

app.get('/user_info', base.user_info);

// POST.
app.post('/find_or_create_room', ensureAuthenticated, base.find_or_create_room);
app.post('/add_song', ensureAuthenticated, base.add_song);
app.post('/reorder_queue', ensureAuthenticated, base.reorder_queue);
app.post('/change_index', ensureAuthenticated, base.change_index);

app.listen(PORT);