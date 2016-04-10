import React from 'react';
import $ from 'jquery';
import appConfig from '../configs/appConfig';
import UserListEntry from '../components/UserListEntry';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], isInWaiting: false };
    }
    componentWillUnmount() {
        if (this.serverRequest) {
            this.serverRequest.abort();
        }
    }
    getUsers() {
        this.setState({
            isInWaiting: true
        });
        this.serverRequest = $.ajax({
            type: 'GET',
            url: `${appConfig.serverUrl}users`,
            cache: false,
            dataType: 'json',
            success: (result) => {
                this.setState({
                    users: result,
                    isInWaiting: false
                });
            },
            error: (result) => {
                this.setState({
                    isInWaiting: false
                });
                throw new Error('Ceva crapasi');
            }
        });

    }
    render() {
        return (
            <div className={`dashboard-container ${this.state.isInWaiting ? 'dashboard-container--in-waiting' : ''}`}>
                <div className="dashboard-container__header">
                    <button onClick={this.getUsers.bind(this)}>SHOW USERS</button>
                    <div className="spinner item--is-inline">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
                <div className="user-container__list">
                    {this.state.users.map((item) =>{return <UserListEntry key={item._id} entry={item}/>})}
                </div>
            </div>
        );
    }
};
