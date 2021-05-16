/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  withRouter,
  BrowserRouter as NavLink, Link,
} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';

import {
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  fetchPosts, likePost, createPost, fetchUsers, updateUserPosts,
} from '../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        tags: '',
        content: '',
        likes: [],
        ownerId: '',
      },
    };
  }

  componentDidMount = (props) => {
    this.props.fetchPosts();
    this.props.fetchUsers();
  }

  like = (postId) => {
    const userId = this.findUserId(this.props.currentUser.name);
    this.props.likePost(userId, postId);
    this.props.history.push('/');
  }

  onTitleChange = (event) => {
    this.setState((prevState) => ({
      post: { ...prevState.post, title: event.target.value },
    }));
  }

  onTagsChange = (event) => {
    this.setState((prevState) => ({
      post: { ...prevState.post, tags: event.target.value },
    }));
  }

  onContentChange = (event) => {
    this.setState((prevState) => ({
      post: { ...prevState.post, content: event.target.value },
    }));
  }

  findUserId = (name) => {
    for (let i = 0; i < this.props.profiles.length; i++) {
      if (name === this.props.profiles[i].name) {
        return i;
      }
    }
    return 0; // return first user by default if cannot find the user in the list
  }

  uploadPost = () => {
    const postOwnerId = this.findUserId(this.props.currentUser.name);
    this.props.createPost(this.findUserId(this.props.currentUser.name), { ...this.state.post, ownerId: postOwnerId });
    this.props.updateUserPosts(this.findUserId(this.props.currentUser.name));
    this.props.history.push('/');
    this.setState({
      post: {
        title: '',
        tags: '',
        content: '',
        likes: [],
        ownerId: '',
      },
    });
  }

  displayPostOwner = (ownerId) => {
    const user = this.props.profiles[ownerId];
    return (
      <div>
        <div>
          <div className="post-owner-profile">
            <img src={user.picture} alt="" className="small-user-picture" />
            <Link exact to={`allusers/${ownerId}`} onClick={() => { console.log('navlink'); }}>
              <div className="post-owner-profile-text">
                <p id="post-user-name">{user.name}</p>
                <p>{user.major}</p>
                <p>{user.role}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  displayAllPosts = (props) => {
    return (this.props.posts.map((post, id) => {
      return (
        <div className="post-container">
          <div>
            {this.displayPostOwner(post.ownerId)}
          </div>
          <div className="post-container-content">
            <div className="post-title">{post.title}</div>
            <div className="post-tags">{post.tags}</div>
            <ReactMarkdown className="post-content">{post.content || ''}</ReactMarkdown>
          </div>
          <div className="post-container-likes">
            <FontAwesomeIcon onClick={() => { this.like(id); }} icon={faThumbsUp} id="post-container-likes-thumbs" />
            <p>{post.likes.length}</p>
          </div>
        </div>
      );
    }));
  }

  displayCreatePost = (props) => {
    return (
      <div className="create-post-container">
        <div>
          <input onChange={this.onTitleChange} value={this.state.post.title} placeholder="Title" id="create-post-title" />
        </div>
        <div>
          <TextareaAutosize
            cacheMeasurements
            value={this.state.post.content}
            onChange={this.onContentChange}
            minRows="15"
            maxRows="15"
            className="create-post-content"
            placeholder="Description: Supports Markdown!"
          />
        </div>
        <div>
          <input onChange={this.onTagsChange} value={this.state.post.tags} placeholder="Tags" id="create-post-tags" />
        </div>
        <button onClick={this.uploadPost} type="button">Submit</button>
      </div>
    );
  }

  displayProfile = (props) => {
    const userID = this.findUserId(this.props.currentUser.name);
    return (
      <div>
        <NavLink exact to={`/allusers/${userID}`} onClick={() => { console.log('123'); }} className="navlink">
          <div className="current-user-section">
            <div>
              <div><img src={this.props.currentUser.picture} alt="user profile" /></div>
              <div className="current-user-section-text">
                <p id="user-section-name">{this.props.currentUser.name}</p>
                <p id="user-section-role">{this.props.currentUser.role}</p>
              </div>

            </div>
          </div>
        </NavLink>
      </div>

    );
  }

  render() {
    return (
      <div className="home-layout">
        <div className="home-user-profile">
          {this.displayProfile()}
        </div>
        <div className="posts-section">
          {this.displayCreatePost()}
          <div className="display-posts-section">
            {this.displayAllPosts()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    posts: state.posts.all,
    currentUser: state.profiles.current,
    profiles: state.profiles.all,
    userPosts: state.profiles.userPosts,
  }
);

export default withRouter(connect(mapStateToProps, {
  fetchPosts, likePost, createPost, fetchUsers, updateUserPosts,
})(Home));
