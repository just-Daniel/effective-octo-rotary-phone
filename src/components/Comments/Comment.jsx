import React from 'react';
import classes from './Comments.module.css';
import moment from 'moment';
import Textarea from '../../UI/Textarea/Textarea';

const Comment = ({comment, ...props}) => {

    return (
        <li>
            <div className={classes.CommentItem}>
                {
                    props.isAuth &&
                    comment.userId === props.userId && 
                    <div className={classes.ButtonsComment}>
                        <button 
                            className={classes.edit}
                            onClick={(event) => props.editComment(event, comment)}
                        >Edit</button>
                        <button 
                            className={classes.delete}
                            onClick={(event) => props.deleteComment(event, comment.id, comment.postId)}
                        >Delete</button>
                    </div>
                }
                <div className={classes.CommentItemContent}>
                    {
                        (props.isEditingComment === comment.id)
                        ? <form className={classes.editCommentContainer}>
                            <Textarea 
                                className={ classes.editTextareaComment }
                                formText={ props.formCommentEdit } 
                                changeTextHandler={ props.changeCommentEdit }
                            />
                            {
                                props.showOnSavingEditError &&
                                <div className={classes.editCommentErrorMessage}>{ props.formCommentEdit.errorMessage }</div>
                            }
                            <div className={classes.editButtons}>
                                <button 
                                    className={classes.save}
                                    onClick={ event => props.onSaveEditComment(event, comment.id, props.formCommentEdit)}
                                    /* disabled={ !props.isFormPostEditValid || props.onClickDisabled } */
                                >Save</button>
                                <button onClick={ () => props.onEditComment(null) }>Cancel</button>
                            </div>
                        </form>
                        : <>
                            <p>
                                {comment.body}
                            </p>
                            <time>{ moment(comment.updatedAt).startOf().fromNow() }</time>
                        </>
                    }
                </div>
            </div>
        </li>
    )
}

export default Comment
