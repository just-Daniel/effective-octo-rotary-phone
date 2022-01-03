import React from 'react';
import { useState } from 'react';
import InputContainer from '../../../UI/Input/InputContainer';
import classes from './Post.module.css';

const Post = props => {
    const [onClickDisabled, setOnClickDisabled] = useState(false);

    const cancelEditForm = (event, closeEditingPost) => {
        event.preventDefault();
        closeEditingPost(props.item.id)
    }

    const editingPost = props.isEditingPostsId
            .find(item => item.postId === props.item.id);
    
    return (
        <div className={classes.Post}>
            {
                (props.initialized && props.item.userId === props.userId ) &&
                <div className={classes.mainButtons}>
                    <button 
                        className={classes.edit}
                        onClick={ () => props.onClickEditPost(props.item, props.isEditingPostsId) }
                    >Edit</button>

                    <button 
                        className={classes.delete}
                        onClick={() => props.onDeletePost(props.item, props.userId, props.currentPage)}
                    >Delete</button>
                </div>
            }
            {
                editingPost
                ? <form>
                    <InputContainer 
                        inputControls={ props.inputsPostEdit }
                        changeInputElement={ props.changePost }
                    />

                    <div className={classes.editButtons}>
                        <button 
                            className={classes.save}
                            onClick={ event => props.onSaveEditPost(event, props.item, props.inputsPostEdit, props.userId, props.currentPage, setOnClickDisabled)}
                            /* disabled={ !props.isFormValid || onClickDisabled } */
                        >Save</button>
                        <button onClick={ event => cancelEditForm(event, props.closeEditingPost) }>Cancel</button>
                    </div>

                </form>
                : <>
                    <div>
                        <h1>{ props.item.title }</h1>
                        <p> { props.item.body } </p>
                    </div>

                    <div className={classes.buttonPostsComment}>
                        <button className={classes.commentBtn}>Comments</button>
                    </div>
                </>
            }
            {/* <div>
                <h1>{ props.item.title }</h1>
                <p> { props.item.body } </p>
            </div>

            <div className={classes.buttonPostsComment}>
                <button className={classes.commentBtn}>Comments</button>
            </div> */}
        
        </div>
    )
}

export default Post;