import React from 'react';
import { connect } from 'react-redux';
import classes from './Comments.module.css';
import Comment from './Comment';
import Textarea from '../../UI/Textarea/Textarea'
import { submitComment, onEditComment, onDeleteComment, saveEditComment, showOnSaveErrorMessage } from '../../redux/comments-reducer';
import { changeComment, initCommentEdit, changeCommentEdit } from '../../redux/form-reducer';

const CommentsContainer = props => {

    const editComment = (event, comment) => {
        event.preventDefault();
        props.onEditComment(comment.id);
        props.initCommentEdit(comment.body)
    }

    const deleteComment = (event, commentId, postId) => {
        event.preventDefault();
        props.onDeleteComment(commentId, postId);
    }

    const submitComment = event => {
        event.preventDefault();
        
        props.submitComment(props.formComment, props.postId, props.userId);
    }

    const onSaveEditComment = (event, commentId, formCommEdit) => {
        event.preventDefault();
        if (!formCommEdit.valid) {
            return props.showOnSaveErrorMessage(true);
        }
        if (props.showOnSaveError && formCommEdit.valid) {
            props.showOnSaveErrorMessage(false);
        }
        
        props.saveEditComment(commentId, formCommEdit);
    }

    return (
        <div className={classes.CommentsContainer}>
            <ul>
                {
                    props.comments.map((comment) => {
                        return (
                            <Comment
                                key={ comment.id }
                                comment={ comment }

                                isAuth={ props.isAuth }
                                userId={ props.userId }

                                editComment={ editComment }
                                deleteComment={ deleteComment }

                                formCommentEdit={ props.formCommentEdit }
                                isEditingComment={ props.isEditingComment }
                                changeCommentEdit={ props.changeCommentEdit }
                                onEditComment={ props.onEditComment }
                                showOnSaveError={ props.showOnSaveError }
                                onSaveEditComment={ onSaveEditComment }
                            />
                        )
                    })
                }
            </ul>
            {
                props.isAuth &&
                <form>
                    <Textarea 
                        formComment={ props.formComment } 
                        changeComment={ props.changeComment }
                    />
                    <button 
                        className={classes.create}
                        onClick={event => submitComment(event)}
                        
                    >Submit</button>
                </form>
            }

        </div>
    )
}

const mapStateToProps = state => ({
    comments: state.comments.comments,
    isEditingComment: state.comments.isEditingComment,
    showOnSaveError: state.comments.showOnSaveError,
    isAuth: state.auth.isAuth,
    userId: state.auth.id,
    formComment: state.form.comment,
    formCommentEdit: state.form.commentEdit
});

const mapDispatchToProps = {
    submitComment,
    onEditComment,
    changeComment,
    initCommentEdit,
    changeCommentEdit,
    saveEditComment,
    showOnSaveErrorMessage, 
    onDeleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);