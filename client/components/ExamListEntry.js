import React from 'react';

export default class ExamListEntry extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="user-container__user">
				<p>{this.props.entry.courseName} on {this.props.entry.examDate}</p>
			</div>
        );
    }
}