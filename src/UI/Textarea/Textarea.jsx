import React from 'react';

const validateInput = (value, validation) => {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.minLength) {
        isValid = value.trim().length >= validation.minLength && isValid;
    }

    return isValid;
}
//  Accepts:  formText, changeTextHandler
const Textarea = props => {
    const onChange = (event, comment) => {
        let newComment = {...comment};

        newComment.value = event.target.value;
        newComment.touched = true;
        newComment.valid = validateInput(newComment.value, newComment.validation);
        
        props.changeTextHandler(newComment);
    }
    
    return (
        <>
            <textarea 
                type={ props.formText.type }
                value={ props.formText.value }
                onChange={ event => onChange(event, props.formText) }
                autoComplete='on'
                placeholder={ props.formText.placeholder }
            />
        </>
    )
}


export default Textarea;