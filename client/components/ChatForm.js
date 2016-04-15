import React from 'react';
import io from 'socket.io-client';

let socket = io();
console.log('socket se intampla aici', socket);
export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ceva: {} };

        socket.emit('register', { user: this.props.currentUser.email });
        socket.on(this.props.currentUser.email, this.receiveMessage.bind(this));

        console.log(socket);
    }
    initChat(data) {
        console.log(data);
    }
    receiveMessage(data) {
        console.log(data, 'esti o vaca');
        this.setState({ ceva: data });
        console.log(this.state.ceva);
    }
    submitMessage(msg) {
        console.log('ceva');
        socket.emit('send-message', { sender: this.props.currentUser.email, receiver: this.props.recipientName, msg: 'sergiu e roscat' });
    }
    render() {
        return (
            <div className="chat-form">
                <h3>{this.props.recipientName}</h3>
               {this.state.ceva.msg}
               <button onClick={this.submitMessage.bind(this)}>trimite</button>
            </div>
        );
    }
}
