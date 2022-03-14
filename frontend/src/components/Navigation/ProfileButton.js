// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };
  return (
    <>
        <button onClick={() => {openMenu(); setShowModal(true);}} className="user-dropdown-button">
                <i className="fas fa-user-circle" />
        </button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <div className="profile-dropdown">
                  <h1>{user.username}</h1>
                  <h2>{user.email}</h2>
                  <div className="profile-dropdown-logout-div">
                    <button onClick={logout} className="profile-dropdown-logout-button">Log Out</button>
                  </div>
                </div>
            </Modal>
        )}
    </>
  );
}

export default ProfileButton;
