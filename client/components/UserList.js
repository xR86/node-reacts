import React from 'react';
import UserListEntry from '../components/UserListEntry';

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isExpanded: false };
        console.log(this.props.users, 'da faq');
    }
    render() {
        return (
            <div className={`user-list ${this.state.isExpanded ? 'user-list--expanded' : ''}`}>
                    {this.props.users.map((item) =>{return <div key={item._id} className="item--has-action" onClick={this.props.userAction.bind(this, item)}><UserListEntry entry={item}/></div>})}
                </div>
        );
    }
};
