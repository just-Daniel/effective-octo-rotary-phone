import { postsReducers } from './posts-reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { announcementReducer } from './announcement-reducer';

const reducers = combineReducers({
    posts: postsReducers,
    announcements: announcementReducer
});

export let store = createStore(reducers, applyMiddleware(thunk))