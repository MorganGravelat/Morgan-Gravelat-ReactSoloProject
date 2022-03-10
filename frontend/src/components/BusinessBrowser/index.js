import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import CreateBusinessForm from './CreateBusinessForm'
import ViewBusinessForm from './ViewBusinessForm'
import { Modal } from '../../context/Modal';
import "./BusinessBrowser.css";

import { getBusinesses, chooseBusiness } from '../../store/business';
import BonusButton  from './BonusButton';

const BusinessBrowser = () => {
    const dispatch = useDispatch();
    const allBusinesses = useSelector(state => state.business.list);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
   // const [showBusinessForm, setShowBusinessForm] = useState(false);


    useEffect(() => {
      dispatch(getBusinesses());
    }, [dispatch]);
    useEffect(() => {
        console.log(allBusinesses);
      }, [allBusinesses]);

    if (!allBusinesses) {
        return null;
    }
    return (
        <div>
            <div className='business-box'>
                <BonusButton hidden={showModal} onClick={() => setShowModal(true)} />
                {allBusinesses.map(business => (
                        <NavLink to={`/api/business/id`}key={business.title} className="business-select" onClick={() => {setShowModal2(true); chooseBusiness(business)}}>
                          <div
                            className={
                              Number.parseInt(businessId) === business.id
                                ? 'nav-entry is-selected'
                                : 'nav-entry'
                            }
                            id='business-container-div'
                          >
                            <img src={`${business.image_url}`} className='nav-entry-image'/>
                            <div>
                              <div className='primary-text'>{business.title}</div>
                            </div>
                          </div>
                        </NavLink>
                ))}
            </div>
            {showModal ? (
                  <Modal onClose={() => setShowModal(false)}>
                    <CreateBusinessForm hideForm={() => setShowModal(false)} />
                  </Modal>
            ) : (
                <></>
            )}
            {showModal2 ? (
                <Modal onClose={() => setShowModal2(false)}>
                    <ViewBusinessForm hideForm={() => setShowModal2(false)} allBusinesses={allBusinesses} />
                </Modal>
            ) : (
                <></>
            )}
        </div>
    )
}

export default BusinessBrowser;
