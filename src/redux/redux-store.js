import { postsReducers } from './posts-reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { announcementReducer } from './announcement-reducer';
import { formReducer } from './form-reducer';

const reducers = combineReducers({
    posts: postsReducers,
    announcements: announcementReducer,
    form: formReducer
});

export let store = createStore(reducers, applyMiddleware(thunk))