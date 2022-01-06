import { commentAPI } from "../api/api";

const SET_POST_COMMENTS = 'SET_POST_COMMENTS';
const TOGGLE_IS_FETCHING_COMMENTS = 'TOGGLE_IS_FETCHING_COMMENTS';
const TOGGLE_IS_SHOWING_COMMENTS = 'TOGGLE_IS_SHOWING_COMMENTS';

const initialState = {
    comments: [],
    isFetchingComments: false,
    isShowingComments: null
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

export default commentsReducer;