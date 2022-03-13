import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import CreateBusinessForm from './CreateBusinessForm'
import ViewBusinessForm from './ViewBusinessForm'
import { Modal } from '../../context/Modal';
import "./BusinessBrowser.css";

import { getBusinesses, selectBusiness } from '../../store/business';
import BonusButton  from './BonusButton';
//className={
//     currentBusiness?.id === business.id
//     ? 'nav-entry is-selected'
//     : 'nav-entry'
// }
const BusinessBrowser = () => {
    const Modal2 = Modal;
    const dispatch = useDispatch();
    const allBusinesses = useSelector(state => state.business.list);
    const currentBusiness = useSelector(state => state.business.selectedBusiness);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
   // const [showBusinessForm, setShowBusinessForm] = useState(false);

   function handleClick(business) {
    dispatch(selectBusiness(business));
   }

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
                        <div key={business.title} className="business-select">
                          <div
                            id='business-container-div'
                          >
                            <img onClick={() => {dispatch(selectBusiness(business)); setShowModal2(true)}} src={`${business.image_url}`} className='nav-entry-image'/>
                            <div onClick={() => {setShowModal2(true)}}>
                              <div className='primary-text'>{business.title}</div>
                            </div>
                          </div>
                        </div>
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
                <Modal2 onClose={() => setShowModal2(false)}>
                    <ViewBusinessForm hideForm={() => setShowModal2(false)}/>
                </Modal2>
            ) : (
                <></>
            )}
        </div>
    )
}

export default BusinessBrowser;
