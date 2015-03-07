var Router = ReactRouter;

var Room = React.createClass({
  mixins: [Router.State],
  addSongToQueue: function(song){
    var new_state = this.state;
    new_state.queue.push(song);
    this.setState(new_state);

    // ADD to database?

  },
  getInitialState: function(){
    return {queue : []};
  },
  componentWillMount: function(){
    this.props.roomId = this.getParams()["roomId"];
    
    // Find or create a new room.
    var url = "/find_or_create_room";
    var data = this.props.roomId;
    $.ajax({
      type: "POST",
      url: url,
      data: data,
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