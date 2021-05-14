/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import '../style.scss';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import Home from './home';
import AllProfiles from './all-profile';
import Login from './login';

const NavBar = (props) => {
  return (
    <nav>
      <ul>
        <NavLink exact to="/"><h1>Social Media</h1></NavLink>
        <NavLink to="/allusers"><h1>My Friends</h1></NavLink>
        <NavLink to="/" onClick={props.changeLogin}><h1>Logout</h1></NavLink>
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
            <NavBar changeLogin={this.updateLogin} />
            <Switch>
              {/* <Route exact path="/logout" component={Login} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Home} />
              <Route path="/allusers" component={AllProfiles} />
              <Route render={() => (<div>post not found</div>)} />
            </Switch>
          </div>
        </Router>
      );
    }
  }
}

// const App = (props) => {
//   return (
//     <Router>
//       <div>
//         <NavBar />
//         <Switch>
//           <Route exact path="/login" component={Login} />
//           <Route exact path="/" component={Home} />
//           <Route path="/allusers" component={AllProfiles} />
//           <Route render={() => (<div>post not found</div>)} />
//         </Switch>
//       </div>
//     </Router>
//   );
// };

export default App;
