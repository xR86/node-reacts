import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, NotFoundRoute } from 'react-router';

import Pagina from '../routes/Pagina';
import AltaPagina from '../routes/AltaPagina';
import RegisterPage from '../routes/RegisterPage';
import LoginPage from '../routes/LoginPage';
import {requireAuth, logged} from '../services/auth';

let redirectGuest = () => {
    browserHistory.push('/login');
}
let redirectUser = () => {
    browserHistory.push('/Pagina');
}

class App extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        logged(redirectUser, redirectGuest);
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
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <Route path="login" component={LoginPage} />
        <Route path="register" component={RegisterPage} />
        <Route path="pagina" component={Pagina} onEnter={requireAuth} />
        <Route path="alta-pagina/:count" component={AltaPagina} onEnter={requireAuth} />*/}
        <IndexRoute component={LoginPage}/>
    </Route>
</Router>
);

ReactDom.render(routes, document.getElementById('container'))
