var sync = require('synchronize');
var fiber = sync.fiber;
var await = sync.await;
var defer = sync.defer;

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

			try {
		    fiber(function() {
		    		if (modifyPlaylist != null) {
		        	upsertData = await(modifyPlaylist(upsertData, defer()));
		    		}
		    		result = await(
		    			Playlist.update(
		    				{_id: chosenPlaylist.id}, 
		    				upsertData, 
		    				{upsert: true}, 
		    				function (err, result){
		    					if (err) throw err;

		    					res.status(200).json({status: "success"});
		    				}), defer()
		    		);
		    });
			} catch(err) {throw err};
	});
}

exports.add_song = function(req, res) {
	// find_or_create_room(req, res, function (chosenPlaylist, nextAction) {

	// 	var newSong = new Song(req.body.song);
	// 	chosenPlaylist.songs.push(newSong);
	// 	console.log("Chosen playlist: " + chosenPlaylist);
	// 	nextAction(chosenPlaylist, upsertData);
	// });

	find_or_create_room(req, res, function (upsertData){
		var newSong = new Song(req.body.song);
		upsertData.songs.push(newSong);
		console.log(upsertData);
	});
};

exports.find_or_create_room = function(req, res) {
	find_or_create_room(req, res);
};