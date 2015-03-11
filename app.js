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
var io = app.io;

// app.io.broadcast('news', { hello: 'world'});

// FIXME Remove for later. Only for learning purposes.
io.on('connection', function (socket) {
	console.log('Connected!!');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


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