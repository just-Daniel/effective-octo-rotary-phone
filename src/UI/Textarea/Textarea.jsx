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

const Textarea = props => {
    const onChange = (event, comment) => {
        let newComment = {...comment};

        newComment.value = event.target.value;
        newComment.touched = true;
        newComment.valid = validateInput(newComment.value, newComment.validation);
        
        props.changeComment(newComment);
    }
    
    return (
        <>
            <textarea 
                type={ props.formComment.type }
                value={ props.formComment.value }
                onChange={ event => onChange(event, props.formComment) }
                autoComplete='on'
                placeholder={ props.formComment.placeholder }
            />
        </>
    )
}


export default Textarea;