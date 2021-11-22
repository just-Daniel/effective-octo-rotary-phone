import { postsReducers } from './posts-reducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    posts: postsReducers
});

export let store = createStore(reducers, applyMiddleware(thunk))