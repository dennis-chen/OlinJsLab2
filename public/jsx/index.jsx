var Container = React.createClass({
    render: function() {
        return (
            <Search/>
        );
    }
});

React.render(
    React.createElement(Container, null),
    document.getElementById('container'));
