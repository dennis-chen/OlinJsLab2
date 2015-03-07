var SongQueue = React.createClass({
    changeSongIndex: function(change_index){
        //check if the new index is in bounds before changing
        var new_index = this.state.song_index + change_index;
        if (!(typeof this.state.queue[new_index] == 'undefined')){
            this.setState({song_index:new_index});
        }
    },
    getInitialState: function(){
        return {song_index:0};
    },
    render: function() {
        var song_titles = this.props.queue.map(function(track) {
            return <div>{track.title}</div>;
        });
        if (this.props.queue.length > 0) {
            song_titles[this.state.song_index] = <div className="songPlaying"> 
                <b>{song_titles[this.state.song_index]}</b>
            </div>;
            var song = this.props.queue[this.state.song_index];
        } 
        return (
            <div className="SongQueue">
                <SongPlayer changeSongIndex={this.changeSongIndex} song={song}/>
                {song_titles}
            </div>
        );
    }
});
