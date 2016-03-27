import React from 'react';
import appConfig from '../configs/appConfig';
import $ from 'jquery';

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            year: ''
        };
    }
    updateEmail(e) {
        this.setState({ email: e.target.value });
    }
    updatePassword(e) {
        this.setState({ password: e.target.value });
    }
    loginUser(e) {
        e.preventDefault();

        let payLoad = {
            email: this.state.email.trim(),
            password: this.state.password.trim()
        }

        let requestObject = $.ajax({
                type: 'POST',
                url: `${appConfig.serverUrl}users`,
                cache: false,
                data: payLoad
            })
            .done(() => {
                // login logic
            })
            .fail((resp) => {
                throw new Error('Ceva crapasi');
            });
    }
    render() {
        return (
            <div className="register-form">
	        	<h1>Login</h1>
	            <form name="registerForm" onSubmit={this.loginUser.bind(this)}>
	        		<label htmlFor="email">Email</label>
	        		<input name="email" value={this.state.email} onChange={this.updateEmail.bind(this)}/>
	        		<label htmlFor="password">Password</label>
	        		<input name="password" value={this.state.password} onChange={this.updatePassword.bind(this)}/>
	        		<input type="submit" value="Login"/>
	        	</form>
        	</div>
        );
    }
}
