var Home = React.createClass({
  goToRoom: function() {
    var room_id = this.refs.search_bar.getDOMNode().value.trim();
    var redirect_url = '/#/room/'+room_id;
    window.location.replace(redirect_url);
  },
  render: function (){
    return (
      <div>
        <div className="enter_room_box">
            <form className="form" ref="room_form" onSubmit={this.goToRoom}>
                <input className="search_bar" id="home_search_bar" ref="search_bar" placeholder="Type a room name!"></input>
                <input className="submit_button" type="submit" value="Go to room"></input>
            </form>
        </div>
      </div>
    );
  }
});
