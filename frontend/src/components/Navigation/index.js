// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';
//<NavLink exact to="/" className="navbar-home-button" id="home-button-navbar">Home</NavLink>
//above removed from above {isLoaded && sessionLinks}
function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const fakeLogin = (e) => {
    return dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password'}))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
            <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        <button className='demo-user-button' onClick={fakeLogin}>Demo User</button>
      </>
    );
  }

  return (
    <div className="nav-signup-login-container">
        <div className='login-signup-navbar-div'>
        {isLoaded && sessionLinks}
        </div>
    </div>
  );
}

export default Navigation;
