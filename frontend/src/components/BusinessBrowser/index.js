import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import CreateBusinessForm from './CreateBusinessForm'
import { Modal } from '../../context/Modal';
import "./BusinessBrowser.css";

import { getBusinesses, createBusiness } from '../../store/business';
import BonusButton  from './BonusButton';

const BusinessBrowser = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const allBusinesses = useSelector(state => state.business.list);
    const [showModal, setShowModal] = useState(false);
   // const [showBusinessForm, setShowBusinessForm] = useState(false);

    useEffect(() => {
      dispatch(getBusinesses());
    }, [dispatch]);
    useEffect(() => {
        console.log(allBusinesses);
      }, [allBusinesses]);
    // useEffect(() => {

    // })
    if (!allBusinesses) {
        return null;
    }
    return (
        <div>
            <div className='business-box'>
                <BonusButton hidden={showModal} onClick={() => setShowModal(true)} />
                {allBusinesses.map(business => (
                        <NavLink key={business.title} to={`/business/${business.id}`} className="business-select">
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
                <Route path='/business/${business.id}'>
                    <h1>Hey!</h1>
                </Route>
            )}
        </div>
    )
}

export default BusinessBrowser;
