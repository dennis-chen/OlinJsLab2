var Router = ReactRouter;

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

// Test route to prove that routing works.
// FIXME Remove this for production.
var Test = React.createClass({
  render: function () {
    return (
      <div>
      	Hello world!
      </div>
    );
  }
});

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="test" handler={Test}/>
    <Route name="room" path=":roomId" handler={Room}/>
    <NotFoundRoute handler={Room}/>
    <DefaultRoute handler={Room}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('container'));
});
