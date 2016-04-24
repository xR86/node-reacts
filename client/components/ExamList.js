import React from 'react';
import $ from 'jquery';


import appConfig from '../configs/appConfig';
import ExamListEntry from '../components/ExamListEntry';
import UserListEntry from '../components/UserListEntry';
import { getAllExams, getUsersFromExam } from '../services/exam-service';
import ChatForm from '../components/ChatForm';

var iconWrapperStyle = {
    width: '2em',
    display: 'inline-block',
    right: '14px',
    top: 0
}

export default class ExamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exams: [],
            usersForExam: [],
            isInWaiting: false
        };
    }
    componentDidMount() {
        this.getExams();
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    getExams() {
        this.setState({ isInWaiting: true });
        this.serverRequest = getAllExams().done((resp) => {
            this.setState({
                exams: resp,
                isInWaiting: false
            });
        }).fail(() => {
            this.setState({ isInWaiting: false });
            throw new Error('Ceva crapasi');
        });
    }
    getExamApplicants(examId) {
        this.setState({ isInWaiting: true });
        this.serverRequest = getUsersFromExam(examId).done((resp) => {
            this.setState({
                usersForExam: resp,
                isInWaiting: false
            });
        }).fail(() => {
            this.setState({ isInWaiting: false });
            throw new Error('Ceva crapasi');
        });
    }
    render() {
        let userList = this.state.usersForExam && this.state.usersForExam.length ?
            <div className="dashboard-container__list">
                        <h3 className="dashboard-container__subtitle">Who you can cheat from</h3>
                        {this.state.usersForExam.map((item) =>{return <div key={item._id} className="item--has-action" onClick={this.openChat.bind(this, item)}><UserListEntry entry={item}/></div>})}
                    </div> :
            ''
        return (
            <div className={`dashboard-container ${this.state.isInWaiting ? 'dashboard-container--in-waiting' : ''}`}>
                <div className="dashboard-container__header">
                    <button className="item--is-inline" onClick={this.getExams.bind(this)}>Refresh Exams</button>
                    <div className="img-responsive" style={iconWrapperStyle}>
                        <img className="img-responsive" src={'../high-school-icons/png/bell.png'} alt="user icon"/>
                    </div>
                    <div className="spinner item--is-inline">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </div>
                <div className="dashboard-container__list">
                    <h3 className="dashboard-container__subtitle">Your exams! Don't mess them up...</h3>
                    {this.state.exams.map((item) =>{return <ExamListEntry key={item._id} retrieveUsers={this.getExamApplicants.bind(this, item._id)} entry={item}/>})}
                </div>
                {userList}
            </div>
        );
    }
};
