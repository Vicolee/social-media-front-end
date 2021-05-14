/* eslint-disable prefer-destructuring */
import axios from 'axios';

// template posts
const allPosts = [
  {
    title: 'post 1',
    tags: 'tag 1',
    content: 'content 1',
    likes: [],
    owner: 'John',
  },
  {
    title: 'post 2',
    tags: 'tag 2',
    content: 'content 2',
    likes: [],
    owner: 'James',
  },
];

export const ActionTypes = {
  CREATE_POST: 'CREATE_POST',
  LIKE_POST: 'LIKE_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
};

export function createPost(post) {
  allPosts.push(post);
  console.log(`all posts: ${allPosts}`);
  return {
    type: ActionTypes.FETCH_POSTS,
    payload: { allPosts },
  };
}

// export const fetchPosts = (payload) => async (dispatch) => {
//   dispatch({ type: ActionTypes.FETCH_POSTS, payload: { allPosts } });
// };

export function fetchPosts() {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_POSTS, payload: { allPosts } });
  };
}

export function fetchPost(postId) {
  const post = allPosts[postId];
  return (dispatch) => {
    dispatch({ type: ActionTypes.FETCH_POST, payload: { post } });
  };
}

export function likePost(userId, postId) {
  if (!allPosts[postId].likes.includes(userId)) {
    allPosts[postId].likes.push(userId);
    console.log(`pushed: ${userId}, ${allPosts[postId].likes}`);
  }
  return {
    type: ActionTypes.FETCH_POSTS,
    payload: { allPosts },
  };
}

export function fetchUsers() {
  return (dispatch) => {
    let results = [];
    axios.get('https://raw.githubusercontent.com/dali-lab/dali-challenges/master/data/DALI_Data.json').then((response) => {
      results = response.data;
      dispatch({ type: ActionTypes.FETCH_USERS, payload: { results } });
      console.log(results);
    }).catch((error) => {
      console.log('fetch users does not work');
    });
  };
}

// id in this case is the index in the json list
export function fetchUser(userId) {
  return (dispatch) => {
    let results = [];
    axios.get('https://raw.githubusercontent.com/dali-lab/dali-challenges/master/data/DALI_Data.json').then((response) => {
      results = response.data[userId];
      console.log(`getting user ${results.name}`);
      dispatch({ type: ActionTypes.FETCH_USER, payload: { results } });
    }).catch((error) => {
      console.log('fetch user does not work');
    });
  };
}
