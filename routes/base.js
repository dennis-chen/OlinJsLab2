function find_or_create_room (req, res, modifyPlaylist) {
	
	var chosenPlaylist;
	Playlist.find({name: req.body.roomId})
		.exec(function (err, playlist){
			if (err) console.error(err);
			
			// Use existing playlist or make a new one.	
			if (playlist.length != 0) {
				chosenPlaylist = new Playlist(playlist[0]);
			} else {
			  chosenPlaylist = new Playlist({
					name: req.body.roomId
				});	
			}

			// Convert document into a JSON object for updating.
			var upsertData = chosenPlaylist.toObject();
			delete upsertData._id;


			modifyPlaylist(chosenPlaylist);
			Playlist.update(
				{_id: chosenPlaylist.id}, 
				upsertData, 
				{upsert: true}, 
				function (err, result){
					if (err) console.error(err);

					res.status(200).json({status: "success"});
				});
	});

}

exports.add_song = function(req, res) {
	find_or_create_room(req, res, function(chosenPlaylist) {
		var newSong = new Song(req.body.song);
		console.log("Chosen playlist: " + chosenPlaylist);
	});
};

exports.find_or_create_room = function(req, res) {
	find_or_create_room(req, res, function (){});
};