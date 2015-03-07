var SongPlayer = React.createClass({
    play: function(){
        console.log('play');
    },
    stop: function(){
        console.log('stop');
    },
    next: function(){
        console.log('next');
        console.log(this.props);
        console.log(this.props.changeSongIndex);
        this.props.changeSongIndex(1);
    },
    previous: function(){
        console.log('previous');
        console.log(this.props.changeSongIndex);
        this.props.changeSongIndex(-1);
    },
    getInitialState: function(){
        return {is_playing:false, error_message:''};
    },
    render: function() {
        return (
            <div>
                <div> </div>
                <b><div onClick={this.play}> PLAY SONG </div></b>
                <div onCLick={this.stop}> STOP SONG </div>
                <div onClick={this.previous}> PREVIOUS SONG </div>
                <div onCLick={this.next}> NEXT SONG </div>
                <div className="error_message"> {this.state.error_message} </div>
            </div>
        );
    }
});
