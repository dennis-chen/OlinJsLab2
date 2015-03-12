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
    return { song_index:0 , queue:this.props.queue};
  },
  componentWillReceiveProps: function(props){
    var songQueueState = this.state;
    songQueueState.queue = props.queue;
    this.setState(songQueueState);
  },
  componentDidMount: function (){
      var this_component = this;
      $( ".sortable" ).sortable({
          start: function (event, ui) {
              //console.log('start')
              //this_component.ui.item.index());
          },
          stop: function (event, ui) {
              //console.log('start')
                      //self.sendUpdatedIndex(ui.item);
          }
      });
      $( ".sortable" ).disableSelection();
  },
  render: function() {
    var queue = this.state.queue;
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
          <div className="sortable">
              {song_titles}
          </div>
      </div>
    );
  }
});
