import React from 'react';

export default class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="page-header">
                <h1>Cheatsheet!</h1>
                <p>The app that helps you pass exams</p>
            </div>);
    }
}