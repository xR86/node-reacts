import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';

import Pagina from '../routes/Pagina';
import AltaPagina from '../routes/AltaPagina';
import RegisterPage from '../routes/RegisterPage';
import LoginPage from '../routes/LoginPage';

let loggedIn = false;

function requireAuth(nextState, replace) {
    if (!loggedIn) {
        replace({
            pathname: '/pagina',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

class App extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        );
    }
};

let routes = (
    <Router history={hashHistory}>
    <Route path="/" component={App}>
        <Route path="login" component={LoginPage} />
        <Route path="register" component={RegisterPage} />
        <Route path="pagina" component={Pagina} />
        <Route path="alta-pagina/:count" component={AltaPagina} onEnter={requireAuth} />*/}
        <IndexRoute component={LoginPage}/>
    </Route>
</Router>
);

ReactDom.render(routes, document.getElementById('container'))
