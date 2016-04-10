import React from 'react';
import { browserHistory } from 'react-router'
import { getCurrentUser, logOut } from '../services/auth';

let proceedAfterLogout = () => {
    browserHistory.push('/login');
};

export default class CurrentUser extends React.Component {
    constructor() {
        super();
        this.state = { user: getCurrentUser() };
    }
    logout() {
        logOut(proceedAfterLogout);
    }
    render() {
        return (
            <div className="current-user">
                <p>Logged in as {this.state.user.email}</p>
                <button onClick={this.logout.bind(this)}>Logout</button>
            </div>);
    }
}
