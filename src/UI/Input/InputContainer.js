import React from 'react';
import Input from './Input';
import is from 'is_js'

const validateInput = (value, validation) => {
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

    return isValid;
}

const InputContainer = props => {
    //  Will add active input for change
    //  Do not show error when prints text
    const onFormChanged = (event, inputName) => {
        const inputControls = {...props.inputControls};
        const input = {...inputControls[inputName]};
    
        input.value = event.target.value;
        input.touched = true;
        input.valid = validateInput(input.value, input.validation);
        inputControls[inputName] = input;
    
        let isFormValid = true;
        
        Object.keys(inputControls).map(inputName => {
            isFormValid = inputControls[inputName].valid === true && isFormValid;
            return isFormValid
        })
    
        props.changeInputElement(inputControls, isFormValid)
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
            />
        )
    })
}

export default InputContainer;