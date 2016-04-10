import React from 'react';

export default class ExamListEntry extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="dashboard-container__user item--has-action" onClick={this.props.retrieveUsers}>
				<p>{this.props.entry.courseName} on {this.props.entry.examDate}</p>
			</div>
        );
    }
}