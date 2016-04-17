import React from 'react';
import io from 'socket.io-client';
import $ from 'jquery';
import appConfig from '../configs/appConfig';

import { getCurrentUser } from '../services/auth';
import UserList from '../components/UserList';
import ChatForm from '../components/ChatForm';

let findInUsers = (userEmail, userList) => {
    let length = userList.length;
    for (let i = 0; i < length; i++) {
        if (userList[i].email === userEmail) {
            return i;
        }
    }

    return -1;
}

export default class ChatContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            socket: io(),
            chatRecipients: [],
            user: getCurrentUser(),
            expandUsers: false,
            offlineMessages: {}
        };
        this.state.socket.emit('register', { user: this.state.user.email });
        this.state.socket.on(this.state.user.email, this.receiveMessages.bind(this));
    }

    componentWillUnmount() {
        this.serverRequest.abort();
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        this.serverRequest = $.ajax({
            type: 'GET',
            url: `${appConfig.serverUrl}users`,
            cache: false,
            dataType: 'json',
            success: (result) => {
                this.setState({
                    users: result
                });
            },
            error: () => {
                throw new Error('Ceva crapasi');
            }
        });

    }
    receiveMessages(data) {
        let index = findInUsers(data.sender, this.state.chatRecipients);
        if (index !== -1) {
            return;
        }
        let user = this.state.users[findInUsers(data.sender, this.state.users)];
        this.setState({ chatRecipients: this.state.chatRecipients.concat([user]) });

        this.state.offlineMessages[data.sender] = data.msg;
        this.setState({ offlineMessages: this.state.offlineMessages });
    }
    openChat(user) {
        this.setState({ chatRecipients: this.state.chatRecipients.concat([user]) });
    }
    closeChat(userEmail) {
        let index = findInUsers(userEmail, this.state.chatRecipients);
        if (index === -1) {
            return;
        }

        this.state.chatRecipients.splice(index, 1);
        this.setState({ chatRecipients: this.state.chatRecipients });
    }
    render() {
        return (
            <div className="chat-form-container">
                <div className="chat-form-container__users">
                    <UserList users={this.state.users} userAction={this.openChat.bind(this)} />
                </div>
                <div className="chat-form-container__chats">
                    {this.state.chatRecipients.map((user) => {return <ChatForm offlineMessages={this.state.offlineMessages[user.email]} key={user._id} socket={this.state.socket} closeChat={this.closeChat.bind(this)} currentUser={this.state.user} recipientName={user.email} />})}
                </div>
            </div>
        );
    }
}
