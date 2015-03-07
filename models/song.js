/**
* Mongo Model for a Song.
* Keeps track of what songs have been added.
*/

var mongoose = require('mongoose');

var SongSchema = mongoose.Schema();
var PlaylistSchema = mongoose.Schema({
	name: String,
	authorId: String,
	songs: [SongSchema]
});

module.exports.Song = mongoose.model("Song", SongSchema);
module.exports.Playlist = mongoose.model("Playlist", PlayListSchema);
