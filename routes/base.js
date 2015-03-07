exports.index = function(req, res) {
    res.render('index');
};

exports.add_song = function(req, res) {
};

exports.find_or_create_room = function(req, res) {
	Playlist.find({name: req.body.roomId})
		.exec(function (err, playlist){
			if (err) console.error(err);
			if (playlist.length != 0) {
			} else {
				var newPlaylist = new Playlist({
					name: req.body.roomId
				});
				newPlaylist.save(function(err){
					if (err) console.error(err);
				});
			}
		});
	res.status(200).json({status: "success"});
};