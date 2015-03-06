var SongQueue = React.createClass({
    render: function() {
        var song_titles = this.props.queue.map(function(track) {
            return <div>{track.name}</div>
        });
        return (
            <div className="SongQueue">
                {song_titles}
            </div>
        );
    }
});
