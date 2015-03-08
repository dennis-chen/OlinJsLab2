var Router = ReactRouter;

var Room = React.createClass({
  mixins: [Router.State],
  addSongToQueue: function(song){
    var _root = this;
    var new_state = this.state;
    new_state.queue.push(song);

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
      _root.setState(new_state);
    })
    .fail(function(){
      // FIXME Change state.
      console.log("Failure!");
    });
  },
  getInitialState: function(){
    // ADD GET existing songs.
    return {queue : []};
  },
  componentWillMount: function(){
    this.props.roomId = this.getParams()["roomId"];
    
    // Find or create a new room.
    $.ajax({
      type: "POST",
      url: "/find_or_create_room",
      data: {
        roomId: this.props.roomId,
      },
    })
    .done(function(){
      // FIXME Change state.
      console.log("Success!");
    })
    .fail(function(){
      // FIXME Change state.
      console.log("Failure!");
    });
  },
  componentDidMount: function(){
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