import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  usersPosts: {},
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return { ...state, all: action.payload.results };
    case ActionTypes.FETCH_USER:
      return { ...state, current: action.payload.results };
    case ActionTypes.FETCH_USER_POSTS:
      return { ...state, usersPosts: action.payload.usersPosts };
    default:
      return state;
  }
};

export default ProfileReducer;
