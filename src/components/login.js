/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import { fetchUser, fetchUsers } from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      validUser: true,
      selectedOption: '',
    };
  }

  componentDidMount = (props) => {
    this.props.fetchUsers();
  }

  getOptions = (props) => {
    const options = [];
    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < this.props.profiles.length; i++) {
      const newDict = {};
      newDict.value = this.props.profiles[i].name;
      newDict.label = this.props.profiles[i].name;
      options.push(newDict);
    }
    this.setState({ options });
  }

  login = (name) => {
    console.log(`name ${name}`);
    if (name === undefined) {
      this.setState({ validUser: false });
    } else {
      const id = this.findUserId(name);
      this.props.fetchUser(id);
      this.props.login();
    }
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

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  render() {
    if (this.state.validUser) {
      return (
        <div className="login-page">
          <div className="login-container">
            <div>Select User To Login As:</div>
            <div onClick={this.getOptions} type="button" id="select-user">
              <Select
                options={this.state.options}
                onChange={this.handleChange}
                defaultValue={null}
                placeholder="Select User"
              />
            </div>
            <button type="button" onClick={() => { this.login(this.state.selectedOption.value); }}>Login</button>
          </div>

        </div>
      );
    } else {
      return (
        <div className="login-page">
          <div className="login-container">
            <div>Select User To Login As:</div>
            <div onClick={this.getOptions} type="button" id="select-user">
              <Select
                options={this.state.options}
                onChange={this.handleChange}
                defaultValue={null}
                placeholder="Select User"
              />
            </div>
            <div>Invalid User! Retry!</div>
            <button type="button" onClick={() => { this.login(this.state.selectedOption.value); }}>Login</button>
          </div>

        </div>
      );
    }
  }
}

const mapStateToProps = (state) => (
  {
    profiles: state.profiles.all,
    current: state.profiles.current,
  }
);

export default withRouter(connect(mapStateToProps, { fetchUsers, fetchUser })(Login));
