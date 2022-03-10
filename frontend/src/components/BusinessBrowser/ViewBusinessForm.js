import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinessTypes, deleteBusiness } from "../../store/business";


const ViewBusinessForm = ({ hideForm, allBusinesses }) => {

    const [viewOne, setViewOne] = useState(false);
    const business = useSelector((state) => state.business?.currentBusiness)

    const dispatch = useDispatch();
    const businessType = useSelector((state) => {
        console.log('THIS IS THE BUSINESS',business);
        return state.business?.types[business?.type_id-1]
    });

    useEffect(() => {
        dispatch(getBusinessTypes());
      }, [dispatch]);


    return (
      <section className="form-holder centered middled">
        <div className="view-business-container-div">
            <div className="view-business-image-div">
                <img className='view-business-img' src={`${business?.image_url}`}/>
            </div>
            <div className="view-business-info-div">
                <div className='view-business-title-div'>
                <h1>{`${business?.title}`}</h1>
                </div>
                <div className='view-business-description-div'>
                    <h2>{`${business?.description}`}</h2>
                </div>
                <div className='view-business-details-div'>
                    <h3>
                        {`${business?.address}`}
                    </h3>
                    <h3>
                        {`${business?.city}`}
                    </h3>
                    <h3>
                        {`${business?.state}`}
                    </h3>
                    <h3>
                        {`${business?.zipCode}`}
                    </h3>
                </div>
            </div>
            <button onClick={() => dispatch(deleteBusiness(business.id))}>-</button>
        </div>
      </section>
    );
};

export default ViewBusinessForm;
