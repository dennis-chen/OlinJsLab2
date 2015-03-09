var Router = ReactRouter;

var SongQueue = React.createClass({
  mixins: [Router.State],
  getInitialState: function (){
    return {song_titles: []};
  },
  componentWillReceiveProps: function (nextProps){
    var songList = nextProps.queue;
    var songQueueState = this.state;

    songList.forEach(function (song, index, array){
      songQueueState.song_titles.push(song.name);
    });

    songQueueState.song_titles = songList.map(function(track) {
      return <div>{track.name}</div>
    });

    this.setState(songQueueState);
  },
  render: function() {
    return (
      <div className="SongQueue">
        {this.state.song_titles}
      </div>
    );
  }
});