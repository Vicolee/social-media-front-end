/* eslint-disable no-prototype-builtins */
/* eslint-disable prefer-destructuring */
import axios from 'axios';

// template posts
const allPosts = [
  {
    title: 'Title 1',
    tags: 'tag 1',
    content: 'content 1',
    likes: [],
    ownerId: '0',
  },
  {
    title: 'Title 2',
    tags: 'tag 2',
    content: 'content',
    likes: [],
    ownerId: '0',
  },
];

// store each users' list of posts ids according to userId
const usersPosts = {
  0: [0, 1],
  50: [],
};

export const ActionTypes = {
  CREATE_POST: 'CREATE_POST',
  LIKE_POST: 'LIKE_POST',
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USER: 'FETCH_USER',
  FETCH_USER_POSTS: 'FETCH_USERS_POSTS',
};

export function createPost(userId, post) {
  allPosts.push(post);
  return {
    type: ActionTypes.FETCH_POSTS,
    payload: { allPosts },
  };
}

export function updateUserPosts(userId) {
  if (!(usersPosts.hasOwnProperty(userId))) {
    usersPosts[userId] = [];
  }
  usersPosts[userId].push(allPosts.length - 1); // push latest post's id created to user's posts lists
  return {
    type: ActionTypes.FETCH_USER_POSTS,
    payload: { usersPosts },
  };
}

export function fetchUsersPosts() {
  return {
    type: ActionTypes.FETCH_USER_POSTS,
    payload: { usersPosts },
  };
}

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
  if (!allPosts[postId].likes.includes(userId)) { // if user has not like the post, add userId
    allPosts[postId].likes.push(userId);
  } else { // if user already liked the post, remove user from like list
    allPosts[postId].likes.splice(allPosts[postId].likes.indexOf(userId));
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
      dispatch({ type: ActionTypes.FETCH_USER, payload: { results } });
    }).catch((error) => {
      console.log('fetch user does not work');
    });
  };
}
