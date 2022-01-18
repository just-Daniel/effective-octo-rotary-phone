import React, { useState } from 'react';
import InputContainer from '../../UI/Input/InputContainer';
import cls from './Post/Post.module.css';

const CreatePost = props => {
    const [onClickDisabled, setOnClickDisabled] = useState(false);

    return (
        <div className={cls.CreatePostForm}>
            <form>
                {/* <h2>Create new post</h2> */}

                <InputContainer 
                    inputControls={ props.inputsPost }
                    changeInputElement={ props.changePost }
                    showOnSubmitError={ props.showOnPostError }
                />

                <button 
                    onClick={ event => props.submitPostCreator(event, setOnClickDisabled) }
                    disabled={ onClickDisabled }
                >Create</button>
            </form>
        </div>
    )
}

export default CreatePost