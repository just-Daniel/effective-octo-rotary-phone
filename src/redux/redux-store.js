import { postsReducers } from './posts-reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { announcementReducer } from './announcement-reducer';
import { formReducer } from './form-reducer';
import { authReducer } from './auth-reducer';

const reducers = combineReducers({
    posts: postsReducers,
    announcements: announcementReducer,
    form: formReducer,
    auth: authReducer
});

export let store = createStore(reducers, applyMiddleware(thunk))