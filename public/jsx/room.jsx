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
        roomId: this.props.roomId,
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
  getInitialState: function(){
    return {queue : []};
  },
  componentWillMount: function(){
    this.props.roomId = this.getParams()["roomId"];
  },
  componentDidMount: function(){

    // FIXME This could probably be repackaged in a smarter way.
    var _root = this;
    var roomState = this.state;

    // Find or create a new room.
    $.ajax({
      type: "POST",
      url: "/find_or_create_room",
      data: {
        roomId: this.props.roomId,
      },
    })
    .done(function(songs){
      roomState.queue = songs["songs"]; // songs contains a list of songs.
      _root.setState(roomState);
    })
    .fail(function(){
      // FIXME Change state.
      console.log("Failure!");
    });
  },
  render: function() {
    return (
      <div>
        <h1>This room is currently {this.props.roomId}</h1>
        <SongQueue queue={this.state.queue}/>
        <Search addSongToQueue={this.addSongToQueue}/>    
      </div>
    );
  }
});