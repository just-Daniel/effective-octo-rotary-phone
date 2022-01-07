import { commentAPI } from "../api/api";
import { initComment } from "./form-reducer";

const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
const TOGGLE_IS_FETCHING_COMMENTS = 'TOGGLE_IS_FETCHING_COMMENTS';
const TOGGLE_IS_SHOWING_COMMENTS = 'TOGGLE_IS_SHOWING_COMMENTS';
const ON_EDIT_COMMENT = 'ON_EDIT_COMMENT';
const SHOW_ON_SAVE_ERROR = 'SHOW_ON_SAVE_ERROR';

const initialState = {
    comments: [],
    isFetchingComments: false,
    isShowingComments: null,
    isEditingComment: null,
    showOnSaveError: false
}

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING_COMMENTS: {
            return {
                ...state,
                isFetchingComments: action.payload
            }
        }
        case TOGGLE_IS_SHOWING_COMMENTS: {
            return {
                ...state,
                isShowingComments: action.payload
            }
        }
        case SET_POST_COMMENTS: {
            return {
                ...state,
                comments: action.payload
            }
        }
        case ON_EDIT_COMMENT: {
            return {
                ...state,
                isEditingComment: 
                    (state.isEditingComment === action.payload) 
                    ? null
                    : action.payload
            }
        }
        case SHOW_ON_SAVE_ERROR: {
            return {
                ...state,
                showOnSaveError: action.payload
            }
        }

        default: {
            return state
        }
    }
}

const setPostComments = (comments) => ({type: SET_POST_COMMENTS, payload: comments});
const toggleIsFetchingComments = isFetching => ({type: TOGGLE_IS_FETCHING_COMMENTS, payload: isFetching});
const toggleIsShowingComments = isShowingComments => ({type: TOGGLE_IS_SHOWING_COMMENTS, payload: isShowingComments});

export const getPostComments = (postId, isShowingComments) => async dispatch => {
    if (isShowingComments === postId) {
        return dispatch(toggleIsShowingComments(null));
    }
    
    dispatch(toggleIsFetchingComments(true));

    const comments = await commentAPI.getPostComments(postId);

    dispatch(setPostComments(comments));
    dispatch(toggleIsFetchingComments(false));
    dispatch(toggleIsShowingComments(postId));
    
}

export const submitComment = (formComment, postId, userId) => async dispatch => {
    const createdDate = new Date().toISOString();

    const comment = {
        body: formComment.value,
        createdAt: createdDate,
        updatedAt: createdDate,
        postId,
        userId
    }

    await commentAPI.submitComment(comment);
    dispatch(getPostComments(postId));
    dispatch(initComment());
}

export const onEditComment = (commentId) => {
    return ({
        type: ON_EDIT_COMMENT, payload: commentId
    })
}

export const saveEditComment = (commentId, formEdit) => async dispatch => {
    const createdDate = new Date().toISOString();
    const updateComment = {
        body: formEdit.value,
        updatedAt: createdDate
    }

    const updated = await commentAPI.updateComment(commentId, updateComment);
    dispatch(getPostComments(updated.postId));
    dispatch(onEditComment(null));
}

export const onDeleteComment = (commentId, postId) => async dispatch => {
    await commentAPI.deleteComment(commentId);
    
    dispatch(getPostComments(postId));
}

export const showOnSaveErrorMessage = showError => ({
    type: SHOW_ON_SAVE_ERROR, payload:showError
})

export default commentsReducer;