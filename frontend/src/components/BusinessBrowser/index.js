import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateBusinessForm from './CreateBusinessForm'
import ViewBusinessForm from './ViewBusinessForm'
import { Modal } from '../../context/Modal';
import "./BusinessBrowser.css";

import { getBusinesses, selectBusiness } from '../../store/business';
import BonusButton  from './BonusButton';

const BusinessBrowser = () => {
    const Modal2 = Modal;
    const dispatch = useDispatch();
    const allBusinesses = useSelector(state => state.business.list);


    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const businessKeys = Object.keys(allBusinesses);

    useEffect(() => {
      dispatch(getBusinesses());
    }, [dispatch]);


    if (!allBusinesses) {
        return null;
    }
    return (
        <div>
            <div className='business-box'>
                <BonusButton hidden={showModal} onClick={() => setShowModal(true)} />
                {businessKeys.map(key => (
                        <div key={allBusinesses[key].id} className="business-select">
                          <div
                            id='business-container-div'
                          >
                            <img onClick={() => {dispatch(selectBusiness(allBusinesses[key])); setShowModal2(true)}} src={`${allBusinesses[key].image_url}`} className='nav-entry-image' alt='the business' />
                            <div>
                              <div className='primary-text'>{allBusinesses[key].title}</div>
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
