function find_or_create_room (req, res, modifyPlaylist) {
	
	var chosenPlaylist;
	Playlist.find({name: req.body.roomId})
		.exec(function (err, playlist){
			if (err) throw err;
			
			if (playlist.length != 0) {
                //use existing playlist
				chosenPlaylist = new Playlist(playlist[0]);
			} else {
              //use old playlist
			  chosenPlaylist = new Playlist({
					name: req.body.roomId,
                    song_index: 0
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

						// Broadcast to all clients of this room that the playlist has changed.
						// FIXME Remove the hardcoded broadcast.
						console.log("Has change happened? " + req.body.hasChangeHappened);
						if (req.body.hasChangeHappened === "true") {
                            console.log('find or create room');
							io.sockets.emit(req.body.roomId, {
								status: "changed"
							});
						}

						// FIXME Make this less bulky by sending back much less information.
						// Return all songs in the playlist.
						res.status(200).json({
							songs: newUpsertData.songs,
                            song_index: newUpsertData.song_index
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

exports.change_index = function(req, res) {
	Playlist.findOne({name: req.body.roomId})
		.exec(function (err, playlist){
            if (err) {
                res.status(404).send("could not find playlist in database!");
            } else {
                console.log(playlist);
                var change_index = req.body.change_index;
                var current_index = playlist.song_index;
                var new_index = parseInt(current_index) + parseInt(change_index);
                console.log(new_index);
                if (typeof playlist.songs[new_index] === 'undefined'){
                    //then new_index is not a valid index. Don't actually change the index.
                    console.log('wrong index');
                    res.status(404).send('Invalid index!');
                } else {
                    playlist.song_index = new_index;
                    playlist.save(function (err){
                        if (err) {
                            console.log("couldn't save");
                            res.status(404).send("Couldn't save playlist!");
                        } else {
                            console.log('index changed');
                            io.sockets.emit(req.body.roomId, {
                                status: "changed"
                            });
                            res.status(200).send('success!');
                        }
                    });
                }
            }
        });
};

exports.add_song = function(req, res) {

	find_or_create_room(req, res, function (chosenPlaylist, upsertData, playlistUpdate){
		var parsedSong = JSON.parse(req.body.song);

		// FIXME Remove unecessary information from ParsedSong so that database doesn't blow up.

		var newUpsertData = upsertData;
		newUpsertData.songs.push(parsedSong);
		playlistUpdate(chosenPlaylist, newUpsertData);
	});
};

exports.reorder_queue = function(req, res){
	Playlist.findOne({name: req.body.roomId})
		.exec(function (err, playlist){
			if (err) {
                res.status(404).send("Couldn't save playlist!");
            } else {
                console.log('In reorder queue!');
                var reordered_songs = playlist.songs;
                var moved_song = reordered_songs.splice(req.body.start_index_to_swap, 1)[0];
                reordered_songs.splice(req.body.stop_index_to_swap, 0, moved_song);
                playlist.songs = reordered_songs;
                playlist.save(function (err){
                    if (err) {
                        res.status(404).send("Couldn't save playlist!");
                    } else {
                        console.log('reorder queue');
                        io.sockets.emit(req.body.roomId, {
                            status: "changed"
                        });
                        res.status(200).send('success!');
                    }
                })
            }
        });
};

exports.find_or_create_room = function(req, res) {
	find_or_create_room(req, res);
};

exports.user_info = function (req, res) {
    // FIXME There's probably a way better way of doing this. I can't think clearly right now.
    // Send back the username of the person logged in.
    if (req.user) {
        res.send(req.user.name.givenName + " " + req.user.name.familyName);
    } else {
        res.status(404);
    }
}