var Router = ReactRouter;

var SongQueue = React.createClass({
  mixins: [Router.State],
  changeSongIndex: function(change_index){
    var songQueueState = this.state;
    var new_index = this.state.song_index + change_index;
    var currentProps = this.props;

    // Check if the new index is in bounds before changing.
    if (!(typeof this.props.queue[new_index] == 'undefined')){
      songQueueState.song_index = new_index;
      this.setState(songQueueState);
      this.componentWillReceiveProps(currentProps);
    }
  },
  getInitialState: function (){
    return {
      song_titles: [], 
      song_index:0
    };
  },
  componentWillReceiveProps: function (nextProps){
    var songList = nextProps.queue;
    var songQueueState = this.state;

    songList.forEach(function (song, index, array){
      songQueueState.song_titles.push(song.name);
    });

    songQueueState.song_titles = songList.map(function(track) {
      return <div>{track.title}</div>
    });

    if (songList.length > 0) {
      var songQueueState = this.state;
      songQueueState.song_titles[this.state.song_index] = <div className="songPlaying"> 
          <b>{this.state.song_titles[this.state.song_index]}</b>
      </div>;
      songQueueState.song = this.props.queue[this.state.song_index];
    }

    this.setState(songQueueState);
  },
  render: function() {
    return (
      <div className="SongQueue">
          <SongPlayer changeSongIndex={this.changeSongIndex} song={this.state.song}/>
          {this.state.song_titles}
      </div>
    );
  }
});