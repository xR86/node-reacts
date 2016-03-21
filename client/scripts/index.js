var React = require('react'),
    ReactDom = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    Link = ReactRouter.Link;

import Pagina from '../routes/Pagina';
import AltaPagina from '../routes/AltaPagina';
import Footer from '../components/Footer';
import Header from '../components/Header';

var PageNav = React.createClass({
    getInitialState: function() {
        return { count: 0 };
    },
    handleClick: function(event) {
        this.setState({ count: ++this.state.count });
    },
    render: function() {
        return (
            <div className="nav">
                <Link to = "pagina" > Pagina </Link> | <Link to={`alta-pagina/${this.state.count}`} onClick={this.handleClick}>Alta pagina</Link>
            </div>
        );
    }
});

var App = React.createClass({
    render: function() {
        return (
            <div className="container">
                <Header/>
                <PageNav/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
});

var routes = (
    <Router history={ReactRouter.hashHistory}>
    <Route path="/" component={App}>
        <Route path="pagina" component={Pagina} />
        <Route path="alta-pagina/:count" component={AltaPagina} />*/}
        <ReactRouter.IndexRoute component={Pagina}/>
    </Route>
</Router>
);

ReactDom.render(routes, document.getElementById('container'))