import React from 'react';
import Input from './Input';
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

    if (validation.minValue) {
        isValid = value >= validation.minValue && isValid;
    }

    if (validation.minLength) {
        isValid = value.length >= validation.minLength && isValid;
    }

    if (validation.password) {
       isValid = props.confirmPassword === value && isValid;
    }

    if(validation.confirmPassword) {
        isValid = props.password === value && isValid;
    }

    return isValid;
}

//  Accepts: inputControls, changeInputElement, showOnSubmitError
const InputContainer = props => {
    console.log('PROPS', props);
    const onFormChanged = (event, inputName) => {
        const inputControls = {...props.inputControls};
        const input = {...inputControls[inputName]};
    
        input.value = event.target.value;
        input.touched = true;
        input.valid = validateInput(input.value, input.validation, props);
        inputControls[inputName] = input;
    
        let isFormValid = true;
        
        Object.keys(inputControls).map(inputName => {
            const password = inputControls[inputName].validation.password;
            const confirmPassword = inputControls[inputName].validation.confirmPassword;

            if (password &&  inputControls[inputName].valid) {
                const equalValuePassAndConfPass= inputControls[inputName].value === inputControls.confirmPassword.value;
                inputControls.confirmPassword.valid = equalValuePassAndConfPass; 
            }

            if (confirmPassword &&  inputControls[inputName].valid) {
                const equalValuePassAndConfPass= inputControls[inputName].value === inputControls.password.value;
                inputControls.password.valid = equalValuePassAndConfPass; 
            }

            isFormValid = inputControls[inputName].valid === true && isFormValid;
            return isFormValid
        })

        const showOnSubmitError = (!isFormValid && props.showOnSubmitError) ? true : false;
        props.changeInputElement(inputControls, isFormValid, showOnSubmitError)
    }

    return Object.keys(props.inputControls).map((inputName, index) => {
        const input = props.inputControls[inputName];

        return (
            <Input
                key={ inputName + index }
                value={ input.value }
                onChange={ event => onFormChanged(event, inputName) }
                label={ input.label }
                placeholder={ input.placeholder }
                valid={ input.valid }
                touched={ input.touched }
                errorMessage={ input.errorMessage }
                type={ input.type }
                min={ input.min }
                max={ input.max }
                showOnSubmitError={props.showOnSubmitError}
            />
        )
    })
}

const mapStateToProps = state => ({
    password: state.form.register.inputControls.password.value,
    confirmPassword: state.form.register.inputControls.confirmPassword.value
})

export default connect(mapStateToProps)(InputContainer);