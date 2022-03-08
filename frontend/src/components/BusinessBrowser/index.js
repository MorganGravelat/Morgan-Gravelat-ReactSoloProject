import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import "./BusinessBrowser.css";

import { getBusinesses } from '../../store/business';

const BusinessBrowser = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const allBusinesses = useSelector(state => state.business.list);
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
            <div className='business-box'>
                {allBusinesses.map(business => (
                        <NavLink key={business.title} to={`/business/${business.id}`} className="business-select">
                          <div
                            className={
                              Number.parseInt(businessId) === business.id
                                ? 'nav-entry is-selected'
                                : 'nav-entry'
                            }
                          >
                            <img src={`${business.image_url}`} className='nav-entry-image'/>
                            <div>
                              <div className='primary-text'>{business.title}</div>
                            </div>
                          </div>
                        </NavLink>
                ))}
            </div>
    )
}

export default BusinessBrowser;
