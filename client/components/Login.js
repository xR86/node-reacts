import React from 'react';
import { browserHistory } from 'react-router'
import $ from 'jquery';

import { logIn, logInFacebook } from '../services/auth';
import appConfig from '../configs/appConfig';
import * as Validations from '../services/form-validation';
import FormField from '../components/FormField';

let proceedAfterLogin = () => {
    browserHistory.push('/pagina');
};


export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            emailErrorObj: {},
            password: '',
            passwordErrorObj: {},
            isSubmitted: false,
            invalidLogin: false
        };
    }
    updateEmail(e) {
        this.setState({ email: e.target.value });
        this.validateEmail(e.target.value);
    }
    validateEmail(value) {
        let valueToTest = value ? value : this.state.email;

        let error = Validations.isRequired(valueToTest);

        if (error) {
            this.setState({ emailErrorObj: { hasErrors: true, errors: error } });
            return false;
        }

        error = Validations.isEmail(valueToTest);

        if (error) {
            this.setState({ emailErrorObj: { hasErrors: true, errors: error } });
            return false;
        }

        this.setState({ emailErrorObj: { hasErrors: false } });
        return true;
    }
    updatePassword(e) {
        this.setState({ password: e.target.value });
        this.validatePassword(e.target.value);
    }
    validatePassword(value) {
        let valueToTest = value ? value : this.state.password;

        let error = Validations.isRequired(valueToTest);

        if (error) {
            this.setState({ passwordErrorObj: { hasErrors: true, errors: error } });
            return false;
        }

        this.setState({ passwordErrorObj: { hasErrors: false } });
        return true;
    }
    loginUser(e) {
        e.preventDefault();

        this.setState({ isSubmitted: true });

        if (!this.validateEmail() | !this.validatePassword()) {
            return;
        }

        logIn(this.state.email, this.state.password, proceedAfterLogin).fail(() => {
            this.setState({ invalidLogin: true });
        });
    }
    facebookLogin() {
        logInFacebook();
    }
    render() {
        return (
            <div className="register-form">
                <h1>Login</h1>
                <form name="registerForm" onSubmit={this.loginUser.bind(this)}>
                    <FormField fieldName="email" fieldType="text" isSubmitted={this.state.isSubmitted} errors={this.state.emailErrorObj} fieldValue={this.state.email} update={this.updateEmail.bind(this)}/>
                    <FormField fieldName="password" fieldType="password" isSubmitted={this.state.isSubmitted} errors={this.state.passwordErrorObj} fieldValue={this.state.password} update={this.updatePassword.bind(this)}/>
                    <input type="submit" value="Login"/>
                    <p>{`${this.state.invalidLogin ? 'Invalid Credentials' : ''}`}</p>
                </form>
                <a href={`${appConfig.serverUrl}login/facebook`}>facebook login</a>
            </div>
        );
    }
}
