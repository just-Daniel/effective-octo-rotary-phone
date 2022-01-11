import React from 'react';
import { connect } from 'react-redux';
import classes from './Comments.module.css';
import Comment from './Comment';
import Textarea from '../../UI/Textarea/Textarea'
import { submitComment, onEditComment, onDeleteComment, saveEditComment } from '../../redux/comments-reducer';
import { changeComment, initCommentEdit, changeCommentEdit, showOnSavingEditErrorMessage, showOnSavingCommentErrorMessage } from '../../redux/form-reducer';

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

    const submitComment = (event, formComment) => {
        event.preventDefault();
        
        if(!formComment.valid) {
            return props.showOnSavingCommentErrorMessage(true);
        }
 
        props.submitComment(formComment, props.postId, props.userId);
    }

    const onSaveEditComment = (event, commentId, formCommEdit) => {
        event.preventDefault();
        if (!formCommEdit.valid) {
            return props.showOnSavingEditErrorMessage(true);
        }
        
        props.saveEditComment(commentId, formCommEdit);
    }

    const getUserInitials = (users, userId) => {
        const user = users.find(u => u.id === userId);
        return `${user.firstname} ${user.lastname}`;
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
                                showOnSavingEditError={ props.showOnSavingEditError }
                                onSaveEditComment={ onSaveEditComment }

                                users={ props.users }
                                getUserInitials={ getUserInitials }
                            />
                        )
                    })
                }
            </ul>
            {
                props.isAuth &&
                <form>
                    <Textarea 
                        formText={ props.formComment } 
                        changeTextHandler={ props.changeComment }
                    />
                    <button 
                        className={classes.create}
                        onClick={event => submitComment(event, props.formComment)}
                        
                    >Submit</button>
                    {
                        props.showOnSavingCommentError &&
                        <div className={classes.editCommentErrorMessage}>{ props.formComment.errorMessage }</div>
                    }
                </form>
            }

        </div>
    )
}

const mapStateToProps = state => ({
    comments: state.comments.comments,
    isEditingComment: state.comments.isEditingComment,
    isAuth: state.auth.isAuth,
    userId: state.auth.id,
    formComment: state.form.comment,
    formCommentEdit: state.form.commentEdit,
    showOnSavingEditError: state.form.commentEdit.showOnSavingEditError,
    showOnSavingCommentError: state.form.comment.showOnSavingCommentError,
    users: state.users.users
});

const mapDispatchToProps = {
    submitComment,
    onEditComment,
    changeComment,
    initCommentEdit,
    changeCommentEdit,
    saveEditComment,
    showOnSavingEditErrorMessage, 
    showOnSavingCommentErrorMessage,
    onDeleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer);