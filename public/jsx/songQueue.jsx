var Router = ReactRouter;

var SongQueue = React.createClass({
  mixins: [Router.State],
  changeSongIndex: function(change_index){
    var songQueueState = this.state;
    var new_index = songQueueState.song_index + change_index;
    // Check if the new index is in bounds before changing.
    if (!(typeof this.props.queue[new_index] == 'undefined')){
      songQueueState.song_index = new_index;
      this.setState(songQueueState);
    }
  },
  getInitialState: function (){
    return {
      song_index:0
    };
  },
  componentDidMount: function (){
  },
  render: function() {
    var queue = this.props.queue;
    var song_titles = queue.map(function(track){ return <div>{track.title}</div> });
    if (song_titles.length > 0) {
      song_titles[this.state.song_index] = <div className="songPlaying"> 
          <b>{song_titles[this.state.song_index]}</b>
      </div>;
      var song = queue[this.state.song_index];
    }
    return (
      <div className="SongQueue">
          <SongPlayer changeSongIndex={this.changeSongIndex} song={song}/>
          {song_titles}
      </div>
    );
  }
});
