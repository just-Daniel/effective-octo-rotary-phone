import React from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import { changePost } from '../../redux/form-reducer';

const validateInput = (value, validation) => {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid
    }

    return isValid;
}

const InputContainer = props => {
    const onFormChanged = (event, inputName) => {
        const postInputs = {...props.inputsPost};
        const input = {...postInputs[inputName]};
    
        input.value = event.target.value;
        input.touched = true;
        input.valid = validateInput(input.value, input.validation);
        postInputs[inputName] = input;
    
        let isFormValid = true;
    
        Object.keys(postInputs).map(inputName => {
            isFormValid = inputName.valid === true && isFormValid;
            return isFormValid
        })
        
        props.changePost(postInputs, isFormValid)
    }

    return Object.keys(props.inputsPost).map((inputName, index) => {
        const input = props.inputsPost[inputName];

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
            />
        )
    })
}

const mapStateToProps = state => ({
    inputsPost: state.form.post.inputControls
})

const mapDispatchToProps = {
    changePost: changePost
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer);