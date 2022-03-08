import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import { getBusinesses } from '../../store/business';

const BusinessBrowser = () => {
    const dispatch = useDispatch();
    const { businessId } = useParams();
    const allBusinesses = useSelector(state => state.allBusinesses);
    useEffect(() => {
      dispatch(getBusinesses());
    }, [dispatch]);
    console.log(getBusinesses());
    if (!allBusinesses) {
        return null;
    }
    return (
            <div>
                {allBusinesses.map(business => {
                    console.log(business, 'hey!');
                    return (
                        <NavLink key={business.title} to={`/business/${business.id}`}>
                          <div
                            className={
                              Number.parseInt(businessId) === business.id
                                ? 'nav-entry is-selected'
                                : 'nav-entry'
                            }
                          >
                            <div
                              className='nav-entry-image'
                              style={{ backgroundImage: `url('${business.image_url}')` }}
                            ></div>
                            <div>
                              <div className='primary-text'>{business.title}</div>
                            </div>
                          </div>
                        </NavLink>
                    )
                })}
            </div>
    )
}

export default BusinessBrowser;
