// Main Room Component.
// Contains search components and the music queue.

var Router = ReactRouter;

var Room = React.createClass({
  // FIXME Figure out why this is important - because without it my code breaks.
  mixins: [Router.State],

  addSongToQueue: function(song){
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
  loadQueueFromMongo: function(){
      console.log('loadQueueFromMongo');
    var roomId = this.getParams()["roomId"];
    var this_component = this;
    var roomState = {};

    $.ajax({
      type: "POST",
      url: "/find_or_create_room",
      data: {
        roomId: roomId,
      },
    })
    .done(function(songs){
      roomState.queue = songs["songs"]; // songs contains a list of songs.
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
      console.log('getinitialstate');
    var roomId = this.getParams()["roomId"];
    return {queue : [], roomId:roomId};
  },
  componentWillReceiveProps: function(){
      console.log('will recieve props');
      this.loadQueueFromMongo();
      this.loadRoomId();
  },
  componentDidMount: function(){
      console.log('componentdidmount');
      this.loadQueueFromMongo();
  },
  render: function() {
    console.log(this.state.roomId);
    return (
      <div>
        <h1>This room is currently {this.state.roomId}</h1>
        <SongQueue queue={this.state.queue}/>
        <Search addSongToQueue={this.addSongToQueue}/>    
      </div>
    );
  }
});
