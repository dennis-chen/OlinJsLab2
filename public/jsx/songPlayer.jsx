var SongPlayer = React.createClass({
    play: function(){
        console.log('play');
        //TODO: get buttons to play/pause the current youtube video.
    },
    stop: function(){
        console.log('stop');
        //TODO: get buttons to play/pause the current youtube video.
    },
    next: function(){
        this.props.changeSongIndex(1);
    },
    previous: function(){
        this.props.changeSongIndex(-1);
    },
    getInitialState: function(){
        return {error_message:''};
    },
    render: function() {
        var songPlayerComponent = this;
        if (this.props.song) {
            var embed_url = "//www.youtube.com/embed/"+this.props.song.id+"?enablejsapi=1";
            var embed_video = <div className="embed_video"> <iframe src={embed_url} frameBorder="0" allowFullScreen id="music_video"></iframe> </div>
        } else {
            var embed_video = <div className="embed_video"> </div>
        }
        return (
            <div>
                {embed_video}
                <div onClick={songPlayerComponent.play}> PLAY SONG </div>
                <div onClick={songPlayerComponent.stop}> STOP SONG </div>
                <div onClick={songPlayerComponent.previous}> PREVIOUS SONG </div>
                <div onClick={songPlayerComponent.next}> NEXT SONG </div>
                <div className="error_message"> {this.state.error_message} </div>
            </div>
        );
    }
});
