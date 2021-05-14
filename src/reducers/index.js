// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import PostReducer from './post-reducer';
import ProfileReducer from './profile-reducer';

const rootReducer = combineReducers({
  posts: PostReducer,
  profiles: ProfileReducer,
});

export default rootReducer;
