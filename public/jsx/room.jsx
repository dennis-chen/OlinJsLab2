// Main Room Component.
// Contains search components and the music queue.

var Router = ReactRouter;

var socket = io.connect('http://localhost');

var Room = React.createClass({
  // FIXME Figure out why this is important - because without it my code breaks.
  mixins: [Router.State],

  changeSongIndex: function(change_index){
      //change_index is the amount to increment or decrease current index by.
    var _root = this;
    var roomState = this.state;
    $.ajax({
      type: "POST",
      url: "/change_index",
      data: {
        roomId: this.state.roomId,
        change_index: change_index
      },
    })
    .done(function(){
        //don't update here, let websockets emitting an event should trigger loading of new song index
    })
    .fail(function(){
      console.log("Failure!");
    });
  
  },
  addSongToQueue: function(song, hasChangeHappened){
    // Temporarily stores the object so that it can be referenced later in a post request.
    var _root = this;
    var roomState = this.state;
    // Find or create a new room.
    $.ajax({
      type: "POST",
      url: "/add_song",
      data: {
        roomId: this.state.roomId,
        song: JSON.stringify(song),
        hasChangeHappened: hasChangeHappened
      },
    })
    .done(function(){
      // Add song to the queue UI.
      roomState.queue.push(song);

      // Update state to reflect changes.
      _root.setState(roomState);
    })
    .fail(function(){
      // FIXME Change state.
      console.log("Failure!");
    });
  },
  reorderQueue: function(start_index_to_swap,stop_index_to_swap){
    // Temporarily stores the object so that it can be referenced later in a post request.
    var _root = this;
    var roomState = this.state;
    // Find or create a new room.
    $.ajax({
      type: "POST",
      url: "/reorder_queue",
      data: {
        roomId: this.state.roomId,
        start_index_to_swap: start_index_to_swap,
        stop_index_to_swap: stop_index_to_swap
      },
    })
    .done(function(data,status){
        //presumably does nothing because event emitter should tell this one to update
    })
    .fail(function(){
      // FIXME Change state.
      console.log("Failure!");
    });
  },
  loadQueueFromMongo: function(hasChangeHappened){
    var roomId = this.getParams()["roomId"];
    var this_component = this;
    var roomState = {};

    $.ajax({
      type: "POST",
      url: "/find_or_create_room",
      data: {
        roomId: roomId,
        hasChangeHappened: hasChangeHappened
      },
    })
    .done(function(songs){
      roomState.queue = songs["songs"]; // songs contains a list of songs.
      roomState.song_index = songs["song_index"]; 
      this_component.setState(roomState);
    })
    .fail(function(){
      roomState.queue = [];
      roomState.message = 'Could not find room!';
      this_component.setState(roomState);
    });
  },
  loadRoomId: function(){
      var roomId = this.getParams()["roomId"];
      var roomState = this.state;
      roomState.roomId = roomId;
      this.setState(roomState);
  },
  getInitialState: function(){

    var _root = this;
    var roomId = this.getParams()["roomId"];

    socket.on(roomId, function (data) {
      // Only happens when the server is emitting for changes.
      _root.loadQueueFromMongo(false);
    });

    return {
      queue : [], 
      roomId:roomId, 
      song_index:0,
    };
  },
  componentWillReceiveProps: function(){
      var _root = this;
      var roomId = this.getParams()["roomId"];

      // FIXME Make this less redundant.
      socket.on(roomId, function (data) {
        // Only happens when the server is emitting for changes.
        _root.loadQueueFromMongo(false);
      });

      // Changing from room to room.
      this.loadQueueFromMongo(true);
      this.loadRoomId();
  },
  componentDidMount: function(){
      // Happens the first time after rendering.
      this.loadQueueFromMongo(true);
  },
  render: function() {
    return (
      <div>
        <h1 id="roomTitle">{this.state.roomId}</h1>
        <Search addSongToQueue={this.addSongToQueue}/>    
        <SongQueue changeSongIndex={this.changeSongIndex} reorderQueue={this.reorderQueue} queue={this.state.queue} song_index={this.state.song_index}/>
      </div>
    );
  }
});
