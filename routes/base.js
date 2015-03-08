function find_or_create_room (req, res, modifyPlaylist) {
	
	var chosenPlaylist;
	Playlist.find({name: req.body.roomId})
		.exec(function (err, playlist){
			if (err) throw err;
			
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

			var playlistUpdate = function (newChosenPlaylist, newUpsertData){
				newChosenPlaylistId = newChosenPlaylist._id;

				Playlist.update(
					{_id: newChosenPlaylistId}, 
					newUpsertData, 
					{upsert: true}, 
					function (err, result){
						if (err) throw err;
						res.status(200).json({status: "success"});
				});
			}

  		if (modifyPlaylist != null) {
      	modifyPlaylist(chosenPlaylist, upsertData, playlistUpdate);
  		} else {
  			playlistUpdate(chosenPlaylist, upsertData);
  		}
	});
}

exports.add_song = function(req, res) {

	find_or_create_room(req, res, function (chosenPlaylist, upsertData, playlistUpdate){
		var parsedSong = JSON.parse(req.body.song);
		console.log(parsedSong);
		var newSong = new Song(parsedSong);
		var newUpsertData = upsertData;
		newUpsertData.songs.push(newSong.toObject());
		console.log(upsertData);
		playlistUpdate(chosenPlaylist, newUpsertData);
	});

};

exports.find_or_create_room = function(req, res) {
	find_or_create_room(req, res);
};