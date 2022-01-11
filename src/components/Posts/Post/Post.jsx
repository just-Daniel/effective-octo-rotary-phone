import React from 'react';
import { useState } from 'react';
import InputContainer from '../../../UI/Input/InputContainer';
import CommentsContainer from '../../Comments/CommentsContainer';
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
                        showOnSubmitError={ props.showOnEditPostError }
                    />

                    <div className={classes.editButtons}>
                        <button 
                            className={classes.save}
                            onClick={ event => props.onSaveEditPost(event, props.item, props.inputsPostEdit, props.userId, props.currentPage, setOnClickDisabled)}
                            disabled={ onClickDisabled }
                        >Save</button>
                        <button onClick={ event => cancelEditForm(event, props.closeEditingPost) }>Cancel</button>
                    </div>

                </form>
                : <div>
                    <div>
                        <h3>{ props.item.title }</h3>
                        <p> { props.item.body } </p>
                    </div>

                    <div className={classes.buttonPostsComment}>
                        <button 
                            className={classes.commentBtn}
                            onClick={(event) => props.showComments(event, props.item.id, props.isShowingComments)}
                        >Comments</button>
                    </div>
                    {
                        props.isShowingComments === props.item.id
                        && <CommentsContainer postId={props.item.id} />
                    }
                </div>
            }

            
        </div>
    )
}

export default Post;