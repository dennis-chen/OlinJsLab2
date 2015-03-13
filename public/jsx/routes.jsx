// Appcomponent.
// Contains the app and all of my routes for rooms.
// Includes the LoginBox that displays in all rooms.

// Set up routing references for later. 
var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var LoginBox = React.createClass({
  getInitialState: function (){
    return {
      login: "",
      isLoggedIn: false
    };
  },
  componentWillMount: function (){
    this.recieveLoginInfo();
  },
  recieveLoginInfo: function (){

    var _root = this;
    var LoginBoxState = this.state;

    $.ajax({
      type: "GET",
      url: "/user_info"
    })
    .done(function(name){
        LoginBoxState.login = name;
        LoginBoxState.isLoggedIn = true;
        _root.setState(LoginBoxState);
    })
    .fail(function(){
      // TODO Catch any errors.
    });
  },
  render: function (){
    if (this.state.isLoggedIn) {
      return (
        <div id="loginStatus">
          <span>Welcome, {this.state.login}! | </span>
          <b><a href="/logout">Logout</a></b>
        </div>
      );
    } else {
      return (
        <div id="loginStatus">
          <b><a href="/auth/facebook">Login with Facebook.</a></b>
        </div>
      );
    }
  }
});

// Load the RouteHandler.
var App = React.createClass({
  render: function () {
    return (
      <div>
        <LoginBox/>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="room" path="room/:roomId" handler={Room}/>
    <NotFoundRoute handler={Home}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

// Run routes afer definition.
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});