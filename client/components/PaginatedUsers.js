import React from 'react';
import $ from 'jquery';
import appConfig from '../configs/appConfig';
import UserListEntry from '../components/UserListEntry';

var iconWrapperStyle = {
    width: '2em',
    display: 'inline-block',
    right: '14px',
    top: 0
}

export default class PaginatedUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            currentPage: 1,
            pageSize: 7,
            isInWaiting: false,
        };
    }
    componentWillUnmount() {
        if (this.serverRequest) {
            this.serverRequest.abort();
        }
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        this.setState({
            isInWaiting: true
        });
        this.serverRequest = $.ajax({
            type: 'GET',
            url: `${appConfig.serverUrl}users?page=${this.state.currentPage}&size=${this.state.pageSize}`,
            cache: false,
            dataType: 'json',
            success: (result) => {
                if (!result || !result.length) {
                    this.setState({ isInWaiting: false });
                    return;
                }

                this.setState({
                    users: this.state.users.concat(result),
                    currentPage: this.state.currentPage + 1,
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
    requestNewPage(event) {

        if (Math.floor(event.target.scrollHeight - event.target.scrollTop) == event.target.offsetHeight) {
            this.getUsers();
        }
    }
    render() {
        return (
            <div className={`dashboard-container ${this.state.isInWaiting ? 'dashboard-container--in-waiting' : ''}`}>
                <div className="dashboard-container__header">
                   <h3 className="dashboard-container__subtitle item--is-inline">Users &nbsp;&nbsp;</h3>
                   <div className="img-responsive" style={iconWrapperStyle}>
                        <img className="img-responsive" src={'../high-school-icons/png/hands.png'} alt="user icon"/>
                    </div>
                    <div className="spinner item--is-inline">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
                <div className="dashboard-container__users" onScroll={this.requestNewPage.bind(this)}>
                    {this.state.users.map((item) =>{return <UserListEntry key={item._id} entry={item}/>})}
                </div>
            </div>
        );
    }
};
