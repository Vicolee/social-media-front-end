/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import {
  faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fetchUser, fetchUsersPosts, fetchPosts, fetchUsers, likePost,
} from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount = (props) => {
    this.props.fetchUser(this.props.match.params.userID);
    this.props.fetchUsersPosts();
    this.props.fetchPosts();
    this.props.fetchUsers();
  }

  displayAllPosts = (props) => {
    const userid = this.props.match.params.userID;
    if (this.props.usersPosts[userid] === undefined || this.props.usersPosts[userid].length === 0) {
      return (
        <div />
      );
    } else {
      return (
        Object.keys(this.props.usersPosts[userid]).map((postId) => {
          return (
            <div className="profile-post-container">
              {this.displayPost(this.props.usersPosts[userid][postId])}
            </div>
          );
        })
      );
    }
  }

  like = (postId) => {
    const userId = this.findUserId(this.props.currentUser.name);
    this.props.likePost(userId, postId);
    this.props.history.push(`/allusers/${userId}`);
  }

  findUserId = (name) => {
    for (let i = 0; i < this.props.profiles.length; i++) {
      if (name === this.props.profiles[i].name) {
        return i;
      }
    }
    return 0; // return first user by default if cannot find the user in the list
  }

  displayPost = (postId) => {
    const post = this.props.posts[postId];
    return (
      <div className="profile-post-container">
        <div className="post-container-content">
          <div className="post-title">{post.title}</div>
          <div className="post-tags">{post.tags}</div>
          <ReactMarkdown className="post-content">{post.content || ''}</ReactMarkdown>
          <div className="post-container-likes">
            <FontAwesomeIcon onClick={() => { this.like(postId); }} icon={faThumbsUp} id="post-container-likes-thumbs" />
            <p>{post.likes.length}</p>
          </div>
        </div>
      </div>
    );
  }

  displayProfile = (props) => {
    return (
      <div className="profile-page">
        <div className="user-profile-info-section user-image">
          <div className="user-profile-info-container">
            <img src={this.props.currentUser.picture} alt="" />
            <p>{this.props.currentUser.major}</p>
            <p>{this.props.currentUser.role}</p>
          </div>
        </div>
        <div className="profile-posts-section">
          <div id="profile-posts-heading">Posts</div>
          {this.displayAllPosts()}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>{this.displayProfile()}</div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    currentUser: state.profiles.current,
    usersPosts: state.profiles.usersPosts,
    posts: state.posts.all,
    profiles: state.profiles.all,
  }
);

export default withRouter(connect(mapStateToProps, {
  fetchUser, fetchUsersPosts, fetchPosts, fetchUsers, likePost,
})(Profile));
