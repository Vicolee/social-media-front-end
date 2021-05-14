import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_POST:
      return { ...state, all: action.payload.allPosts };
    case ActionTypes.LIKE_POST:
      return { ...state, all: action.payload.allPosts };
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload.allPosts };
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload.post };
    default:
      return state;
  }
};

export default PostReducer;
