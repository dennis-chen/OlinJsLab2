var Router = ReactRouter;

var Room = React.createClass({
    mixins: [Router.State],
    addSongToQueue: function(song){
        var new_state = this.state;
        new_state.queue.push(song);
        this.setState(new_state);

        // ADD to database?
    },
    getInitialState: function(){
        return {queue : []};
    },
    componentDidMount: function(){

    },
    render: function() {
        return (
            <div>
                <SongQueue queue={this.state.queue} roomId={this.getParams().messageId}/>
                <Search addSongToQueue={this.addSongToQueue} roomId={this.getParams().messageId}/>
            </div>
        );
    }
});
