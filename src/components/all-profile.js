/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import {
  faHome,
  faMusic,
  faShoePrints,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchUsers, fetchUser } from '../actions';

class AllProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersModal: [],
    };
  }

  componentDidMount = (props) => {
    this.props.fetchUsers();
    this.initializeModal();
  }

  initializeModal = () => {
    for (let i = 0; i < this.props.profiles.length; i++) {
      this.state.usersModal[i] = false;
    }
  }

  handleOpenModal = (id) => {
    const newModalStates = [...this.state.usersModal];
    let newModalState = { ...newModalStates[id] };
    newModalState = true;
    newModalStates[id] = newModalState;
    this.setState((prevState) => ({ usersModal: newModalStates }));
  }

  handleCloseModal = (id) => {
    const newModalStates = [...this.state.usersModal];
    let newModalState = { ...newModalStates[id] };
    newModalState = false;
    newModalStates[id] = newModalState;
    this.setState((prevState) => ({ usersModal: newModalStates }));
    console.log('closing modal');
  }

  displayUser = (user, id) => {
    return (
      <div className="user-container">
        <div onClick={() => { this.handleOpenModal(id); }} role="button" tabIndex="0" className="all-users">
          <div className="user-name">{user.name}</div>
          <div className="user-image"><img src={user.picture} alt="user profile" /></div>
        </div>
        <ReactModal
          isOpen={this.state.usersModal[id]}
          contentLabel="user content"
          onRequestClose={() => { this.handleCloseModal(id); }}
          // eslint-disable-next-line react/jsx-boolean-value
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          <div>
            <div id="user-modal-quote">{user.quote}</div>
            <div id="user-modal-content-container">
              <div id="user-modal-image-content">
                <img src={user.picture} alt="" className="modal-image" />
                <div>
                  <div id="user-modal-shoe">
                    <FontAwesomeIcon icon={faShoePrints} className="user-modal-icon" />
                    {user.favoriteShoe}
                  </div>
                  <div id="user-modal-music">
                    <FontAwesomeIcon icon={faMusic} className="user-modal-icon" />
                    {user.favoriteArtist}
                  </div>
                  <div id="user-modal-m">
                    Favorite Color:
                    {user.favoriteColor}
                  </div>
                </div>
              </div>
              <div id="user-modal-detail-content">
                <div>
                  Name:
                  {user.name}
                </div>
                <div>
                  Year:
                  {user.year}
                </div>
                <div>
                  Gender:
                  {user.gender}
                </div>
                <div>
                  Birthday:
                  {user.birthday}
                </div>
                <div>
                  Major:
                  {user.major}
                </div>
                <div>
                  Role:
                  {user.role}
                </div>
                <div>
                  <FontAwesomeIcon icon={faHome} className="user-modal-icon" />
                  <span>{user.home}</span>
                </div>
              </div>
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }

  displayAllUsers = (props) => {
    return (this.props.profiles.map((user, id) => {
      if (user.name !== this.props.current.name) {
        return (
          <div>{this.displayUser(user, id)}</div>
        );
      } else {
        return null; // do not display logged in user.
      }
    }));
  }

  render() {
    return (
      <div>
        {this.displayAllUsers()}
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  {
    profiles: state.profiles.all,
    current: state.profiles.current,
  }
);

export default withRouter(connect(mapStateToProps, { fetchUsers, fetchUser })(AllProfiles));
