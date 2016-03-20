import React from 'react';
import UserList from '../components/UserList';

export default class Pagina extends React.Component {
    constructor(props) {
    	super(props);
    }
    render() {
        return (
            <div className="page-container">
				<h2>This is the home page!</h2>
				<UserList />
			</div>
        );
    }
};