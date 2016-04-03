import React from 'react';

export default class FormField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasErrors: false };
    }
    render() {
        return (
            <div className={`form-field ${this.props.errors.hasErrors && this.props.isSubmitted ? 'form-field--error' : ''}`}>
            <span className="form-field__error-message">{this.props.errors.errors}</span>
                <label htmlFor={this.props.fieldName}>{this.props.fieldName}</label>
                <input name={this.props.fieldName} type={this.props.fieldType} value={this.props.fieldValue} onChange={this.props.update}/>
            </div>
        );
    }
}
