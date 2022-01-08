import React from 'react';
import is from 'is_js'
import { connect } from 'react-redux';

const validateInput = (value, validation, props) => {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
        isValid = is.email(value) && isValid;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    if(validation.confirmPassword) {
        isValid = props.password === value
    }

    return isValid;
}

//  Accepts:  changeInputElement, input
const InputItem = props => {
   
    const onFormChanged = (event, inputControl) => {
        const input = {...inputControl};
    
        input.value = event.target.value;
        input.touched = true;
        input.valid = validateInput(input.value, input.validation, props);
        
        props.changeInputElement(input)
    }

    
    return (
        <input
            value={ props.input.value }
            onChange={ event => onFormChanged(event, props.input) }
            placeholder={ props.input.placeholder }
            type={ props.input.type }
        />
    )
}

const mapStateToProps = state => ({
    password: state.form.register.inputControls.password.value,
    confirmPassword: state.form.register.inputControls.confirmPassword
})

export default connect(mapStateToProps)(InputItem);