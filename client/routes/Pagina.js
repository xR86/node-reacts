import React from 'react';

import UserList from '../components/UserList';
import ExamList from '../components/ExamList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageNav from '../components/PageNav';
import ChatContainer from '../components/ChatContainer';
import PaginatedUsers from '../components/PaginatedUsers';

var ribbonStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    border: 0
};

export default class Pagina extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page-container">
                <a href={'https://github.com/xR86/node-reacts'}><img style={ribbonStyle} src={'https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png'} /></a>
                <ChatContainer />
                <Header />
                <PageNav />
                <h2>This is the home page!</h2>
                <ExamList />
                <PaginatedUsers />
                <Footer />
            </div>
        );
    }
};
