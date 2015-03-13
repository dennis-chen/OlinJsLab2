var Router = ReactRouter;

var SongQueue = React.createClass({
  mixins: [Router.State],
  changeSongIndex: function(change_index){
      this.props.changeSongIndex(change_index);
  },
  getInitialState: function (){
    console.log('get initial state!');
    return { queue:this.props.queue };
  },
  componentWillReceiveProps: function(props){
    var songQueue = this;
    var songQueueState = this.state;
    songQueueState.queue = props.queue;
    this.setState(songQueueState);
      $( ".sortable" ).sortable({
          start: function (event, ui) {
              songQueueState.start_drag_index = ui.item.index();
              songQueue.setState(songQueueState);
              $(ui.helper).addClass("draggedSong");
          },
          stop: function (event, ui) {
              var start_drag_index = songQueueState.start_drag_index;
              var stop_drag_index = ui.item.index();
              songQueue.props.reorderQueue(start_drag_index,stop_drag_index);
              //this line is to force react to re-render without attempting to use the prior state, which fucks things up.
              songQueueState.queue = [];
              songQueue.setState(songQueueState);
          }
      });
      $( ".sortable" ).disableSelection();
  },
  componentDidMount: function (){
      var songQueue = this;
      var songQueueState = this.state;
      $( ".sortable" ).sortable({
          start: function (event, ui) {
              songQueueState.start_drag_index = ui.item.index();
              songQueue.setState(songQueueState);
          },
          stop: function (event, ui) {
              var start_drag_index = songQueueState.start_drag_index;
              var stop_drag_index = ui.item.index();
              songQueue.props.reorderQueue(start_drag_index,stop_drag_index);
              //this line is to force react to re-render without attempting to use the prior state, which fucks things up.
              songQueueState.queue = [];
              songQueue.setState(songQueueState);
          }
      });
      $( ".sortable" ).disableSelection();
  },
  render: function() {
    var queue = this.state.queue;
    var song_titles = queue.map(function(track){ return <div className="song_title" >{track.title}</div> });
    if (song_titles.length > 0) {
      song_titles[this.props.song_index] = <div className="songPlaying"> 
          <b>{song_titles[this.props.song_index]}</b>
      </div>;
      var song = queue[this.props.song_index];
    }
    return (
      <div className="SongQueue">
          <SongPlayer changeSongIndex={this.props.changeSongIndex} song={song}/>
          <div className="sortable">
            {song_titles}
          </div>
      </div>
    );
  }
});
