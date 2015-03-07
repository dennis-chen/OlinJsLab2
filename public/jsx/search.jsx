var SearchResult = React.createClass({
    handleClick: function() {
        console.log('clicked a search result');
        this.props.addSongToQueue(this.props.track);
    },
    render: function() {
        var album_image_url = this.props.track.album.images[1].url ;
        return (
            <div className="search_this.props.track" onClick={this.handleClick} >
                <div className="trackName">{this.props.track.name}</div>
                <div className="artistName">{this.props.track.artists[0].name}</div>
                <div><img className="albumCover" src={album_image_url}></img></div>
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
            this.searchTracks(query);
        } else {
            this.setState({search_results: []});
        }
    },
    searchTracks: function(query) {
        var this_component = this;
        $.ajax({
            url: 'https://api.spotify.com/v1/search',
            data: {
                q: query,
                type: 'track'
            },
            success: function (response) {
                var search_results = response.tracks.items;
                console.log(search_results);
                this_component.setState({search_results: search_results});
            }
        });
    },
    getInitialState: function(){
        return {search_results : []};
    },
    render: function() {
        return (
            <div>
                <input className="search_bar" onChange={this.handleChange} type="text" ref="SearchBar"></input>
                <SearchResults addSongToQueue={this.props.addSongToQueue} searchResults={this.state.search_results} ref="searchResults"/>
            </div>
        );
    }
});
