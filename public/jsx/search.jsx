var SearchResults = React.createClass({
    render: function() {
        console.log(this.props.searchResults);
        var results = this.props.searchResults.map( function (result) {
            var album_image_url = result.album.images[1].url ;
            return (
                <div className="search_result">
                    <div className="trackName">{result.name}</div>
                    <div className="artistName">{result.artists[0].name}</div>
                    <div><img className="albumCover" src={album_image_url}></img></div>
                </div>
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
        console.log('lol');
        console.log(this.refs.SearchBar.getDOMNode().value.trim());
        this.searchTracks(this.refs.SearchBar.getDOMNode().value.trim());
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
    componentDidMount: function(){

    },
    render: function() {
                //<SearchBar onChange={this.handleChange} ref="SearchBar" />
        return (
            <div>
                <input className="search_bar" onChange={this.handleChange} type="text" ref="SearchBar"></input>
                <SearchResults searchResults={this.state.search_results} ref="searchResults"/>
            </div>
        );
    }
});