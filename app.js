// Utility Imports.
var express = require('express');
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
var Song = require('./models/song').Song;
var Playlist = require('./models/song').Playlist;

// Config.
var app = express();

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

// API Routing Table.

// GET.

// POST.
app.post('/find_or_create_room', base.find_or_create_room);
app.post('/add_song', base.add_song);

app.listen(PORT);