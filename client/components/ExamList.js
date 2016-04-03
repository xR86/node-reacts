import React from 'react';
import $ from 'jquery';
import appConfig from '../configs/appConfig';
import ExamListEntry from '../components/ExamListEntry';

export default class ExamList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { exams: [] };
    }
    componentDidMount() {
        this.getUsers();
    }
    componentWillUnmount() {
        this.serverRequest.abort();
    }
    getUsers() {
        this.serverRequest = $.ajax({
            type: 'GET',
            url: `${appConfig.serverUrl}exams`,
            cache: false,
            success: (result) => {
                this.setState({
                    exams: result
                });
            },
            error: (result) => {
                throw new Error('Ceva crapasi');
            }
        });

    }
    render() {
        return (
            <div className="dashboard-container">
                <button onClick={this.getUsers.bind(this)}>Refresh Exams</button>
                <div className="user-container__list">
                    {this.state.exams.map((item) =>{return <ExamListEntry key={item._id} entry={item}/>})}
                </div>
            </div>
        );
    }
};
