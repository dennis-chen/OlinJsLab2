var Router = ReactRouter;

var Room = React.createClass({
  mixins: [Router.State],
  addSongToQueue: function(song){
    var _root = this;
    var roomState = this.state;
    roomState.queue.push(song);

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
  componentWillReceiveProps: function () {
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