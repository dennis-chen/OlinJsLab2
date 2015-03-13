// Mongo Model for a Song.
// Keeps track of what songs have been added.

var mongoose = require('mongoose');

var PlaylistSchema = mongoose.Schema({
	name: String,
	authorId: String,
	songs: [],
    song_index: Number
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
