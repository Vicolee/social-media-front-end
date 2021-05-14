/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import {
  fetchPosts, likePost, createPost, fetchUsers,
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
      },
    };
  }

  componentDidMount = (props) => {
    this.props.fetchPosts();
    this.props.fetchUsers();
  }

  displayAllPosts = (props) => {
    return (this.props.posts.map((post, id) => {
      return (
        <div className="post-container">
          <div>{post.title}</div>
          <div>{post.tags}</div>
          <ReactMarkdown>{post.content || ''}</ReactMarkdown>
          <button onClick={() => { this.like(id); }} type="button">{post.likes.length}</button>
        </div>
      );
    }));
  }

  like = (postId) => {
    const userId = this.findUserId(this.props.currentUser.name);
    this.props.likePost(userId, postId);
    this.props.history.push('/');
    console.log(this.props.posts[0].likes);
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
    console.log(this.props.profiles.length);
    for (let i = 0; i < this.props.profiles.length; i++) {
      if (name === this.props.profiles[i].name) {
        return i;
      }
    }
    return 0; // return first user by default if cannot find the user in the list
  }

  uploadPost = () => {
    this.props.createPost(this.state.post);
    this.props.history.push('/');
    this.setState({
      post: {
        title: '',
        tags: '',
        content: '',
        likes: [],
      },
    });
  }

  displayCreatePost = (props) => {
    return (
      <div>
        <div>
          <input onChange={this.onTitleChange} value={this.state.post.title} placeholder="Title" />
        </div>
        <div>
          <TextareaAutosize
            cacheMeasurements
            value={this.state.post.content}
            onChange={this.onContentChange}
            minRows="15"
            maxRows="15"
            className="text-box"
            placeholder="Description: Supports Markdown!"
          />
        </div>
        <div>
          <input onChange={this.onTagsChange} value={this.state.post.tags} placeholder="Tags" />
        </div>
        <button onClick={this.uploadPost} type="button">Submit</button>
      </div>
    );
  }

  displayProfile = (props) => {
    return (
      <div className="current-user-section">
        <div><img src={this.props.currentUser.picture} alt="user profile" /></div>
        <div>{this.props.currentUser.name}</div>
        <div>{this.props.currentUser.role}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="home-layout">
        <div>
          {this.displayProfile()}
        </div>
        <div className="posts-section">
          {this.displayCreatePost()}
          {this.displayAllPosts()}
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
  }
);

export default withRouter(connect(mapStateToProps, {
  fetchPosts, likePost, createPost, fetchUsers,
})(Home));
