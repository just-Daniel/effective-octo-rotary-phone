import { postsReducers } from './posts-reducer';
import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { announcementReducer } from './announcement-reducer';
import { formReducer } from './form-reducer';
import { authReducer } from './auth-reducer';
import appReducer from './app-reducer';
import registerReducer from './register-reducer';
import commentsReducer from './comments-reducer';
import usersReducer from './users-reducer';

const reducers = combineReducers({
  posts: postsReducers,
  announcements: announcementReducer,
  form: formReducer,
  auth: authReducer,
  app: appReducer,
  register: registerReducer,
  comments: commentsReducer,
  users: usersReducer
});

//  Redux browser tools
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

let store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

window.store = store;

export default store