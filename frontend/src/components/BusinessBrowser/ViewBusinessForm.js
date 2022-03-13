import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBusiness, editBusiness } from "../../store/business";
import { getReviews, DeleteReview } from "../../store/review";
import './BusinessBrowser.css';


const ViewBusinessForm = ({ hideForm, allBusinesses }) => {
    let owner_id;
    const businessTypes = useSelector((state) => state.business.types);
    const grabBusiness = useSelector((state) => state.business?.currentBusiness)
    let business = grabBusiness
    owner_id = useSelector((state) => state.session.user?.id)
    const reviews = useSelector((state) => state.reviews.allReviews)
    const [viewOne, setViewOne] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [id, setId] = useState(business.id);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [type, setType] = useState(businessTypes[0]);
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [image_url, setimageurl] = useState("");
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(10);
    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateType = (e) => setType(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateZipCode = (e) => setZipCode(e.target.value);
    const updateImageUrl = (e) => setimageurl(e.target.value);
    const updateComment = (e) => setComment(e.target.value);
    const updateRating = (e) => setRating(e.target.value);
    const businessType = useSelector((state) => {
        return state.business?.types[business?.type_id-1]
    });

    function setBusiness() {

    }
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
            await dispatch(getReviews(business.id));
        })();
    }, [dispatch]);
    const deletionButton = async () => {
        await dispatch(deleteBusiness(business.id));
        hideForm();
    }

    const deleteReview = async (reviewId) => {
        await dispatch(DeleteReview(reviewId))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();

      const Business = {
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
      business.title = title
      business.description = description
      business.address = address
      business.city = city
      business.type = type
      business.state = state
      business.zipCode = zipCode
      business.image_url = image_url

      await dispatch(editBusiness(Business));

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
          <button className='create-new-business-button' type="submit">Finalize Edit</button>
        </form>
      </section>
    ) : (
    <section className="form-holder centered middled view-business-display-section">
        <div className="view-business-display-div">
            <div className="view-business-container-div">
                <div className="view-business-image-div">
                    <img className='view-business-img' src={`${business?.image_url}`}/>
                </div>
                <div className="view-business-info-div">
                    <div className='view-business-title-div'>
                    <h1 className='business-info-title'>{business?.title}</h1>
                    </div>
                    <div className='view-business-description-div'>
                        <h2>{business?.description}</h2>
                    </div>
                    <div className='view-business-details-div'>
                        <h3>
                            {business?.address}
                        </h3>
                        <h3>
                            {business?.city}
                        </h3>
                        <h3>
                            {business?.state}
                        </h3>
                        <h3>
                            {business?.zipCode}
                        </h3>
                    </div>
                </div>
                {owner_id===business.owner_id ? (
                    <div className="view-business-button-div">
                        <button className='view-business-modal-button' onClick={deletionButton}>DELETE</button>
                        <button className='view-business-modal-button' onClick={() => {setShowEdit(true); setValues(); }}>EDIT</button>
                    </div>
                ) : (<></>)
                }
            </div>
            <div className='view-business-comments-div'>
                <div className='written-comments-div'>
                {Object.values(reviews).map((review) =>
                (<>
                    <div className='comments-section-div' key={review.id}>
                        <h3 className="review-comment-h3">{review.comments}</h3>
                        <h5 className="review-rating-h5">{review.rating}</h5>
                    </div>
                    <button className='comment-edit-button'>DELETE ⇈</button>
                </>
                )
                )}
                </div>
                <section className="new-form-holder centered middled">
                <form className="edit-Business-form" onSubmit={handleSubmit}>
                    <input
                    type="text"
                    placeholder="Write out a Review"
                    value={comment}
                    onChange={updateComment}
                    />
                    <select value={rating} onChange={updateRating}>
                        <option>10</option>
                        <option>9</option>
                        <option>8</option>
                        <option>7</option>
                        <option>6</option>
                        <option>5</option>
                        <option>4</option>
                        <option>3</option>
                        <option>2</option>
                        <option>1</option>
                    </select>
                </form>
                </section>
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
