import React from 'react';
import io from 'socket.io-client';

let socket = io();
console.log('socket se intampla aici', socket);
export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messageList: [], message: '' };

        socket.emit('register', { user: this.props.currentUser.email });
        socket.on(this.props.currentUser.email, this.receiveMessage.bind(this));

        console.log(socket);
    }
    initChat(data) {
        console.log(data);
    }
    receiveMessage(data) {
        console.log(this.state.messageList, 'esti o vaca');
        data.timeStamp = new Date().getTime();
        this.setState({ messageList: this.state.messageList.concat([data]) });
        console.log(this.state.messageList);
    }
    submitMessage() {
        if (!this.state.message) {
            return;
        }
        console.log('se trimite');
        socket.emit('send-message', { sender: this.props.currentUser.email, receiver: '2@2.com', msg: this.state.message });
        this.setState({ message: '' });
    }
    updateMessage(e) {
        this.setState({ message: e.target.value });
    }
    render() {
        return (
            <div className="chat-form">
                <h3>{this.props.recipientName}</h3>
               {this.state.messageList.map((item) =>{return <p key={item.timeStamp}>{item.msg}</p>})}
               <input onChange={this.updateMessage.bind(this)} value={this.state.message} type="text"/>
               <button onClick={this.submitMessage.bind(this)}>trimite</button>
            </div>
        );
    }
}
