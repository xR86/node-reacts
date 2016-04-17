import React from 'react';

import UserList from '../components/UserList';
import ExamList from '../components/ExamList';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageNav from '../components/PageNav';
import ChatContainer from '../components/ChatContainer';
import PaginatedUsers from '../components/PaginatedUsers';

export default class Pagina extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="page-container">
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
