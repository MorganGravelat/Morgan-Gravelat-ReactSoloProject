// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <br />
        <NavLink to="/signup">Sign Up</NavLink>
        <br />
      </>
    );
  }

  return (
    <div>
        <NavLink exact to="/">Home</NavLink>
        <br />
        {isLoaded && sessionLinks}
    </div>
  );
}

export default Navigation;
