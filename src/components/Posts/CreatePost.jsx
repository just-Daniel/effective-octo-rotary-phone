import React, { useState } from 'react';
import InputContainer from '../../UI/Input/InputContainer';

const CreatePost = props => {
    const [onClickDisabled, setOnClickDisabled] = useState(false);

    return (
        <form>
            <h2>Create new post</h2>

            <InputContainer 
                inputControls={ props.inputsPost }
                changeInputElement={ props.changePost }
            />

            <button 
                onClick={ event => props.createPostHandler(event, setOnClickDisabled) }
                disabled={ !props.isFormValid || onClickDisabled }
            >Create</button>
        </form>
    )
}

export default CreatePost