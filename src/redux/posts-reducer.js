import { articleAPI } from "../api/api";
import { initStatePost } from "./form-reducer";

const SET_POSTS = 'SET_POSTS';
const SET_COUNT_POSTS = 'SET_COUNT_POSTS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

const initialState = {
    // id: null,
    // title: '',
    // body: '',
    // createdAt: '',
    // updatedAt: '',
    // userId: null
    posts: [],
    currentPage: 1,
    limitPage: 5,
    countPosts: 0,
    isFetching: false
}

export const postsReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS: {
            return {
                ...state, 
                posts: action.posts
            }
        }
        case SET_COUNT_POSTS: {
            return {
                ...state,
                countPosts: action.payload
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.payload
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.payload
            }
        }

        default: { return state }
    }
}

const setPostsAC = posts => ({type: SET_POSTS, posts });
const setCountPostAC = countPosts => ({type: SET_COUNT_POSTS, payload: countPosts});
const setCurrentPageAC = currentPage => ({type: SET_CURRENT_PAGE, payload: currentPage});
const toggleIsFetchingAC = isFetching => ({type: TOGGLE_IS_FETCHING, payload: isFetching});

export const getPosts = (currentPage, limitPage) => async dispatch => {
    dispatch(toggleIsFetchingAC(true))
    dispatch(setCurrentPageAC(currentPage))

    const setPosts = posts => {
        dispatch(toggleIsFetchingAC(false));  
        dispatch(setPostsAC(posts.data));
    }

    const posts = await articleAPI.getPosts(currentPage, limitPage);

    if (posts.data.length === 0 && currentPage !== 1) {
        dispatch(setCurrentPageAC(currentPage - 1))
        const posts = await articleAPI.getPosts(currentPage - 1, limitPage);
        setPosts(posts);
    }
    
    setPosts(posts)
    
}

export const getCountPosts = () => dispatch => {
    articleAPI.getCountPosts().then(res => {
        dispatch(setCountPostAC(res))
    })
}


export const submitPost = (newPostText, userId, currentPage) => async dispatch => {
    const createdDate = new Date().toISOString();
    const newPost = {
        title: newPostText.title.value,
        body: newPostText.body.value,
        createdAt: createdDate,
        updatedAt: createdDate,
        userId
    }

    await articleAPI.submitPost(newPost);
    const posts = await articleAPI.getPosts(currentPage);
    
    dispatch(setPostsAC(posts.data));
    dispatch(initStatePost());
    dispatch(getCountPosts());
}

export const deletePost = (item, userId, currentPage) => async dispatch => {

    if (item.userId === userId) {
        await articleAPI.deletePost(item.id);

        dispatch(getPosts(currentPage));
        dispatch(getCountPosts());
    }
    
}