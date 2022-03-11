import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusinessTypes, deleteBusiness, editBusiness } from "../../store/business";
import { getReviews } from "../../store/review";


const ViewBusinessForm = ({ hideForm, allBusinesses }) => {

    const [viewOne, setViewOne] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const business = useSelector((state) => state.business?.currentBusiness)
    const businessTypes = useSelector((state) => state.business.types);
    const owner_id = useSelector((state) => state.session.user.id)
    const reviews = useSelector((state) => state.reviews)
    const [id, setId] = useState(business.id)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState(businessTypes[0]);
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [image_url, setimageurl] = useState("");
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateType = (e) => setType(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateZipCode = (e) => setZipCode(e.target.value);
    const updateImageUrl = (e) => setimageurl(e.target.value);
    const businessType = useSelector((state) => {
        return state.business?.types[business?.type_id-1]
    });
    function setValues() {
        setId(parseInt(id));
        setTitle(business.title);
        setDescription(business.description);
        setAddress(business.address);
        setCity(business.city);
        setType(businessType);
        setState(business.state);
        setZipCode(business.zipCode);
        setimageurl(business.image_url);

    }

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            dispatch(getBusinessTypes());
            dispatch(getReviews(business.id));
        })();
    }, [dispatch]);


    const handleSubmit = async (e) => {
      e.preventDefault();

      const business = {
        id,
        owner_id,
        title,
        description,
        address,
        city,
        type,
        state,
        zipCode,
        image_url,
      };

      const editedBusiness = await dispatch(editBusiness(business));

      setShowEdit(false);

    };

    return (
    <div>
    {showEdit ? (
        <section className="new-form-holder centered middled">
        <form className="edit-Business-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={updateTitle}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={updateDescription}
          />
          <input
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={updateAddress}
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={updateCity}
          />
          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={updateState}
          />
          <input
            type="text"
            placeholder="Zip Code"
            value={zipCode}
            onChange={updateZipCode}
          />
          <input
            type="text"
            placeholder="Image Address"
            value={image_url}
            onChange={updateImageUrl}
          />
          <select value={type} onChange={updateType}>
            {businessTypes.map(business_type =>
            <option key={business_type.business_type}>{business_type.business_type}</option>
              )}
          </select>
          <button type="submit">Finalize Edit</button>
        </form>
      </section>
    ) : (
    <section className="form-holder centered middled">
        <div>
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
                <button className='view-business-modal-button' onClick={() => dispatch(deleteBusiness(business.id))}>❌</button>
                <button className='view-business-modal-button' onClick={() => {setShowEdit(true); setValues(); }}>✎</button>
            </div>
            <div className='view-business-comments-div'>
                <h1>Comments</h1>
            </div>
        </div>
    </section>)}
  </div>
    );
};

 /*{ {reviews.map(business_type =>
                    <option key={business_type.business_type}>{business_type.business_type}</option>
                )} }*/

export default ViewBusinessForm;
