/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { fetchUsers, fetchUser } from '../actions';

class AllProfiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   name: 'Jasmine Mai',
    //   year: '\'20',
    //   picture: 'https://api.typeform.com/responses/files/1fbd3a5a0c7c84062b88ee2c6af2dff06af0edc30e316b0086c1389fff2faf4a/IMG_5087.jpg',
    //   gender: 'Female',
    //   'American Indian or Alaska Native': '',
    //   Asian: 'Asian',
    //   'Black or African American': '',
    //   'Hispanic or Latino': '',
    //   'Middle Eastern': '',
    //   'Native Hawaiian or Other Pacific Islander': '',
    //   White: '',
    //   Other: '',
    //   major: 'Computer Science',
    //   minor: '',
    //   modification: 'Digital Arts',
    //   birthday: '5/2/98',
    //   role: 'Developer',
    //   home: 'San Francisco, CA',
    //   quote: '"Adventure is out there!" - Up',
    //   favoriteShoe: 'Running shoes',
    //   favoriteArtist: 'Ariana Grande',
    //   favoriteColor: 'Blue',
    //   phoneType: 'iOS',
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
        <div onClick={() => { this.handleOpenModal(id); }} role="button" tabIndex="0">
          <div>{user.name}</div>
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
            <div>{user.quote}</div>
            <div>
              <img src={user.picture} alt="" className="modal-image" />
              <div>
                Shoe Icon:
                {user.favoriteShoe}
                Music Icon:
                {user.favoriteArtist}
                Favorite Color:
                {user.favoriteColor}
              </div>
              <div>
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
                  Role Icon:
                  {user.role}
                </div>
                <div>
                  Home Icon:
                  {user.home}
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
      return (
        <div>{this.displayUser(user, id)}</div>
      );
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
  }
);

export default withRouter(connect(mapStateToProps, { fetchUsers, fetchUser })(AllProfiles));
