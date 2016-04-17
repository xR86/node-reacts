import React from 'react';

import { getCurrentUser } from '../services/auth';

export default class ChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messageList: [], message: '' };

        this.props.socket.on(this.props.currentUser.email, this.receiveMessage.bind(this));
    }
    receiveMessage(data) {
        if (data.sender !== this.props.recipientName) {
            return;
        }
        data.timeStamp = new Date().getTime();
        this.setState({ messageList: this.state.messageList.concat([data]) });
    }
    submitMessage() {
        if (!this.state.message) {
            return;
        }
        console.log('se trimite', );
        this.props.socket.emit('send-message', { sender: this.props.currentUser.email, receiver: this.props.recipientName, msg: this.state.message });
        let data = {
            timeStamp: new Date().getTime(),
            msg: this.state.message,
            self: true
        }
        this.setState({ messageList: this.state.messageList.concat([data]) });
        this.setState({ message: '' });
    }
    updateMessage(e) {
        this.setState({ message: e.target.value });
    }
    render() {
        return (
            <div className="chat-form">
                <div className="chat-form__header">
                    <h3 className="item--is-inline">{this.props.recipientName}</h3>
                    <span onClick={this.props.closeChat.bind(this, this.props.recipientName)} className="chat-form__close item--has-action">X</span>
                </div>
                <div className="message-list">
                    <p>{this.props.offlineMessages}</p>
                    {this.state.messageList.map((item) =>{return <p key={item.timeStamp} className={`message-list__msg ${item.self ? 'message-list__msg--self' : ''}`}>{item.msg}</p>})}
                </div>
               <input onChange={this.updateMessage.bind(this)} value={this.state.message} type="text"/>
               <button onClick={this.submitMessage.bind(this)}>Send</button>
            </div>
        );
    }
}
