import React from 'react';
import classes from './Input.module.css';

const isInvalid = ({touched, valid}) => {
    return touched && !valid
}

const Input = (props) => {
    const inputType = props.type || 'text';
    const randomId = `${inputType} + ${Math.random()}`;
    const cls = [classes.Input];

    if(isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={ cls.join(' ')}>
            <label htmlFor={randomId}>{ props.label }</label>
            <input 
                type={ inputType }
                id={randomId}
                value={ props.value }
                onChange={ props.onChange }
                autoComplete='on'
                placeholder={ props.placeholder }
                min={ props.min }
                max={ props.max }
            />
            {
                isInvalid(props)
                && <span>{ props.errorMessage || 'Enter value' } </span>
            }
        </div>
    )
}

export default Input