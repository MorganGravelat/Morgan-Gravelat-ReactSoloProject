// frontend/src/components/SignupFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AboutForm from './AboutForm';
import './AboutForm.css';

function AboutMeModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='navbar-signup-button' onClick={() => setShowModal(true)}>About Us</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AboutForm />
        </Modal>
      )}
    </>
  );
}

export default AboutMeModal;
