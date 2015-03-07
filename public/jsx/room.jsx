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

    // ADD Create playlist.
    return {queue : []};
  },
  componentDidMount: function(){

  },
  componentWillReceiveProps: function () {
  },
  render: function() {
    return (
      <div>
        <h1>Something is {this.getParams()["roomId"]}</h1>
        {/*
          <SongQueue queue={this.state.queue} roomId={this.getParams().messageId}/>
          <Search addSongToQueue={this.addSongToQueue} roomId={this.getParams().roomId}/>
        */}
        <SongQueue queue={this.state.queue}/>
        <Search addSongToQueue={this.addSongToQueue}/>    
      </div>
    );
  }
});