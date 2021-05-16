/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
  faHome, faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Home from './home';
import AllProfiles from './all-profile';
import Login from './login';
import Profile from './profile';
import {
  fetchUser, fetchUsersPosts, fetchPosts,
} from '../actions';

const NavBar = (props) => {
  return (
    <nav>
      <ul>
        <NavLink exact to="/"><FontAwesomeIcon icon={faHome} className="nav-icon" /></NavLink>
        <div>
          <NavLink to="/allusers"><FontAwesomeIcon icon={faUserFriends} className="nav-icon" /></NavLink>
          <NavLink to={`/allusers/${props.userID}`}><img src={props.userPhoto} alt="" className="nav-user-picture" /></NavLink>
          <NavLink to="/" onClick={props.changeLogin}><h1>Logout</h1></NavLink>
        </div>

      </ul>
    </nav>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayLogin: true,
    };
  }

  updateLogin = () => {
    if (this.state.displayLogin) {
      this.setState({ displayLogin: false });
    } else {
      this.setState({ displayLogin: true });
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

  render() {
    if (this.state.displayLogin) {
      return (
        <Router>
          <Login login={this.updateLogin} />
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <NavBar changeLogin={this.updateLogin} userID={this.findUserId(this.props.currentUser.name)} userPhoto={this.props.currentUser.picture} />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route exact path="/allusers" component={AllProfiles} />
              <Route exact path="/allusers/:userID" component={Profile} />
              <Route render={() => (<div>page not found</div>)} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

const mapStateToProps = (state) => (
  {
    currentUser: state.profiles.current,
    profiles: state.profiles.all,
  }
);

export default (connect(mapStateToProps, {
  fetchUser, fetchUsersPosts, fetchPosts,
})(App));
