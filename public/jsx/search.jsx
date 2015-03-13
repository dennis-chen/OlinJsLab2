// Search Component.

// A singular search result.
var SearchResult = React.createClass({
  handleClick: function() {
    this.props.addSongToQueue(this.props.track, hasChangeHappened=true);
    this.refs.SearchBar.getDOMNode().value('');
  },
  render: function() {
    var thumbnail_url = 'http://img.youtube.com/vi/'+ this.props.track.id +'/mqdefault.jpg'
    return (
      <div className="search_result clearfix" onClick={this.handleClick} >
        <div><img className="videoThumbnail" src={thumbnail_url}></img></div>
        <div className="trackName">{this.props.track.title}</div>
      </div>
    );
  }
});

// List of search items.
var SearchResults = React.createClass({
  render: function() {
    var searchResultsComponent = this;
    var results = this.props.searchResults.map( function (result) {
      return (
        <SearchResult track={result} addSongToQueue={searchResultsComponent.props.addSongToQueue} />
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
    var searchComponent = this;
    var query = encodeURIComponent(query);
    var youtube_url='http://gdata.youtube.com/feeds/api/videos?q='+query+'&format=5&max-results=20&v=2&alt=jsonc'; 
    $.ajax({
    type: "GET",
    url: youtube_url,
    dataType:"jsonp",
    success: function(response)
    {
      if(response.data.items){
        var music_responses = response.data.items.filter(function(response){
          return response.category === 'Music';
        });
        if(music_responses.length > 0){
          searchComponent.setState({search_results: music_responses, message:''});
        } else {
          searchComponent.setState({search_results: [], message:'No music found!'});
        }
      } else {
        searchComponent.setState({search_results: [], message:'No music found!'});
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
    return (
      <div>
        <input className="search_bar" onChange={this.handleChange} type="text" ref="SearchBar" placeholder="Which song do you want to hear?"></input>
        {/*
          // FIXME Integrate into search results in the future. 
          <div className="message">{this.state.message}</div>
        */}
        <SearchResults addSongToQueue={this.props.addSongToQueue} searchResults={this.state.search_results} ref="searchResults"/>
      </div>
    );
  }
});