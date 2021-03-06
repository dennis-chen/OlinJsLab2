// SongPlayer component.
// Handles music playing and video rendering.

var SongPlayer = React.createClass({
    play: function(){
        //TODO: get buttons to play/pause the current youtube video.
    },
    stop: function(){
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
            var embed_video = <div className="embed_video"> <iframe src={embed_url} frameBorder="0" width="320" height="65"allowFullScreen id="music_video"></iframe> </div>
        } else {
            var embed_video = <div className="embed_video"> </div>
        }
        return (
            <div className="playerButtons">
                {embed_video}
                <div onClick={songPlayerComponent.previous} className="fa fa-fast-backward playerButton"></div>
                {/*
                    <div onClick={songPlayerComponent.play} className="fa fa-play playerButton"></div>
                    <div onClick={songPlayerComponent.stop} className="fa fa-pause playerButton"></div>
                */}
                <div onClick={songPlayerComponent.next} className="fa fa-fast-forward playerButton"></div>

                <div className="error_message"> {this.state.error_message} </div>
            </div>
        );
    }
});