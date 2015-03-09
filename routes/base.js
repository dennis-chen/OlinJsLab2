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

						// FIXME Make this less bulky by sending back much less information.
						// Return all songs in the playlist.
						res.status(200).json({
							songs: newUpsertData.songs
						});
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

		// FIXME Remove unecessary information from ParsedSong so that database doesn't blow up.

		var newUpsertData = upsertData;
		newUpsertData.songs.push(parsedSong);
		playlistUpdate(chosenPlaylist, newUpsertData);
	});
};

exports.find_or_create_room = function(req, res) {
	find_or_create_room(req, res);
};