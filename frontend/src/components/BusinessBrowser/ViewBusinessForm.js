import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBusiness, editBusiness } from "../../store/business";
import { getReviews, DeleteReview, createReview } from "../../store/review";
import { allUsers } from "../../store/session";
import './BusinessBrowser.css';


const ViewBusinessForm = ({ hideForm, allBusinesses }) => {
    let owner_id;
    const businessTypes = useSelector((state) => state.business.types);
    const grabBusiness = useSelector((state) => state.business?.currentBusiness)
    let business = grabBusiness
    owner_id = useSelector((state) => state.session.user?.id)
    let users = useSelector((state) => state.session.users)
    const reviews = useSelector((state) => state.reviews.allReviews)
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
    const updateState = (e) => setState(e.target.value);
    const updateZipCode = (e) => setZipCode(e.target.value);
    const updateImageUrl = (e) => setimageurl(e.target.value);
    const updateComment = (e) => setComment(e.target.value);
    const updateRating = (e) => setRating(e.target.value);
    let userKeys = Object.keys(users)
    function findOwner(id) {
        let username;
        for (let i = 0; i < userKeys.length; i++) {
            let key = userKeys[i];
            if (users[key].id === id) username = users[key].username;
        }
        return username;
    }

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
            await dispatch(getReviews(business.id));
            await dispatch(allUsers());
        })();
    }, [dispatch]);


    const reviewUpdate = async () => {
        await dispatch(getReviews(business.id))
    }
    const deletionButton = async () => {
        await dispatch(deleteBusiness(business.id))
        hideForm();
    }
    const reviewDeletion = async (id) => {
        await dispatch(DeleteReview(id));
        await dispatch(getReviews(business.id));
    }

    const reviewSubmit = async (e) => {
        e.preventDefault();
        let user_id = owner_id;
        let business_id = parseInt(grabBusiness.id);
        let comments = comment;
        const review = {
            user_id,
            business_id,
            rating,
            comments,
          };

        await dispatch(createReview(review));
        await dispatch(getReviews(business.id));
    }
    const handleSubmit = async (e) => {
      e.preventDefault();

      const Business = {
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

      await dispatch(editBusiness(Business, business.id));

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
            required
            value={city}
            onChange={updateCity}
          />
          <input
            type="text"
            placeholder="State"
            required
            value={state}
            onChange={updateState}
          />
          <input
            type="text"
            placeholder="Zip Code"
            required
            value={zipCode}
            onChange={updateZipCode}
          />
          <input
            type="text"
            placeholder="Image Address"
            required
            value={image_url}
            onChange={updateImageUrl}
          />
          <button className='create-new-business-button' type="submit">Finalize Edit</button>
        </form>
      </section>
    ) : (
    <section className="form-holder centered middled view-business-display-section">
        <div className="view-business-display-div">
            <div className="view-business-container-div">
                <div className="view-business-image-div">
                    <img className='view-business-img' src={`${business?.image_url}`} alt='The front of the business'/>
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
                    <div className='comments-section-div' key={`div${review.id}`}>
                        <h3 className="review-comment-h3" key={`h3${review.id}`}>{review.comments}</h3>
                        <h5 className="review-rating-h5" key={`h5{review.id}`}>Rating:{review.rating}</h5>
                        <h2 key={`h2{review.id}`}>{findOwner(review.user_id)}</h2>
                    </div>
                    {owner_id===review.user_id ?
                    (<button onClick={()=>reviewDeletion(review.id)} className='comment-edit-button' key={`button${review.id}`}>DELETE ⇈</button>) :
                    (<></>)}
                </>
                )
                )}
                </div>
                <section className="new-form-holder centered middled">
                <form className="write-review-form" onSubmit={reviewSubmit}>
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
                    <button type='submit' className="create-new-business-button">Write Review</button>
                </form>
                </section>
            </div>
        </div>
    </section>)}
  </div>
    );
};


export default ViewBusinessForm;
