// Contains the app and all of my routes for rooms.

// Set up routing references for later. 
var Router = ReactRouter;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

// Load the RouteHandler.
var App = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="room" path="room/:roomId" handler={Room}/>
    <Route name="home" path="home" handler={Home}/>
    <Route name="login" handler={Login}/>
    <NotFoundRoute handler={Login}/>
    <DefaultRoute handler={Login}/>
  </Route>
);

// Run routes afer definition.
Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});