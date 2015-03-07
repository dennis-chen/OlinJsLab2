var SearchResult = React.createClass({
    handleClick: function() {
        this.props.addSongToQueue(this.props.track);
    },
    render: function() {
        console.log(this.props.track);
        var thumbnail_url = 'http://img.youtube.com/vi/'+ this.props.track.id +'/mqdefault.jpg'
        return (
            <div className="search_result" onClick={this.handleClick} >
                <div className="trackName">{this.props.track.title}</div>
                <div><img className="videoThumbnail" src={thumbnail_url}></img></div>
            </div>
        );
    }
});

var SearchResults = React.createClass({
    render: function() {
        var this_component = this;
        var results = this.props.searchResults.map( function (result) {
            return (
                <SearchResult track={result} addSongToQueue={this_component.props.addSongToQueue} />
            );
        });
        return (
            <div className="search_results">
                {results}
            </div>
        );
    }
});

var Search = React.createClass({
    handleChange: function(){
        var query = this.refs.SearchBar.getDOMNode().value.trim()
        if (query) {
            this.searchYoutube(query);
        } else {
            this.setState({search_results: []});
        }
    },
    searchYoutube: function(query){
        var this_component = this;
        console.log('searching youtube');
        var query = encodeURIComponent(query);
        var youtube_url='http://gdata.youtube.com/feeds/api/videos?q='+query+'&format=5&max-results=20&v=2&alt=jsonc'; 
        $.ajax({
        type: "GET",
        url: youtube_url,
        dataType:"jsonp",
        success: function(response)
        {
            if(response.data.items){
                console.log(response.data.items);
                var music_responses = response.data.items.filter(function(response){
                    return response.category === 'Music';
                });
                if(music_responses.length > 0){
                    this_component.setState({search_results: music_responses, message:''});
                } else {
                    this_component.setState({search_results: [], message:'No music found!'});
                }
            } else {
                this_component.setState({search_results: [], message:'No music found!'});
            }
        },
        error: function(){
            this_component.setState({search_results: [], message:'Error searching youtube!'});
        }});
    },
    getInitialState: function(){
        return {search_results : [], message:''};
    },
    render: function() {
        console.log(this.props);
        return (
            <div>
                <input className="search_bar" onChange={this.handleChange} type="text" ref="SearchBar"></input>
                <div className="message">{this.state.message}</div>
                <SearchResults addSongToQueue={this.props.addSongToQueue} searchResults={this.state.search_results} ref="searchResults"/>
            </div>
        );
    }
});
