var Router = ReactRouter;

var SongQueue = React.createClass({
  mixins: [Router.State],
  changeSongIndex: function(change_index){
    var songQueueState = this.state;
    var new_index = songQueueState.song_index + change_index;
    // Check if the new index is in bounds before changing.
    if (!(typeof songQueueState.queue[new_index] == 'undefined')){
      songQueueState.song_index = new_index;
      this.setState(songQueueState);
    }
  },
  getInitialState: function (){
    console.log('get initial state!');
    return { song_index:0 , queue:this.props.queue };
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
          },
          stop: function (event, ui) {
              var start_drag_index = songQueueState.start_drag_index;
              var stop_drag_index = ui.item.index();
              songQueue.props.reorderQueue(start_drag_index,stop_drag_index);
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
          }
      });
      $( ".sortable" ).disableSelection();
  },
  render: function() {
    var queue = this.state.queue;
    var song_titles = queue.map(function(track){ return <div className="song_title">{track.title}</div> });
    if (song_titles.length > 0) {
      song_titles[this.state.song_index] = <div className="songPlaying"> 
          <b>{song_titles[this.state.song_index]}</b>
      </div>;
      var song = queue[this.state.song_index];
    }
    return (
      <div className="SongQueue">
          <SongPlayer changeSongIndex={this.changeSongIndex} song={song}/>
          <div className="sortable">
              {song_titles}
          </div>
      </div>
    );
  }
});
