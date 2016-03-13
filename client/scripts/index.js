var React = require('react'),
    ReactDom = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link;


var Header = React.createClass({
    render: function() {
        return ( < div className = "page-header" >
            < h1 > Aparent merge... < /h1>  < p > Schimba si tu vreo doua pagini ca sa fii sigur < /p > < /div >
        );
    }
});

var PageNav = React.createClass({
            getInitialState: function() {
                return { count: 0 };
            },
            handleClick: function(event) {
                this.setState({ count: ++this.state.count });
            },
            render: function() {
                    return ( < div className = "nav" >
                            < Link to = "pagina" > Pagina < /Link> | < Link to={`alta-pagina/${this.state.count}`} onClick={this.handleClick}> Alta pagina < /Link > < /div>
        );
    }
});

var App = React.createClass({
    render: function() {
        return ( < div className = "container" >
            < Header / >
            < PageNav / >
            {this.props.children}
            < /div>
        );
    }
});

var routesConfig = {
    Pagina: require('../routes/Pagina'),
    AltaPagina: require('../routes/AltaPagina')
};

var routes = ( 
<Router history={ReactRouter.hashHistory}>
    <Route path="/" component={App}>
        <Route path="pagina" component={routesConfig.Pagina} />
        <Route path="alta-pagina/:count" component={routesConfig.AltaPagina} />
        <ReactRouter.IndexRoute component={routesConfig.Pagina}/>
    </Route>
</Router>
);

ReactDom.render(routes, document.getElementById('container'))
