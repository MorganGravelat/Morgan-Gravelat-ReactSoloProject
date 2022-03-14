import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessTypes, createBusiness } from "../../store/business";
import './BusinessBrowser.css';

const CreateBusinessForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const owner_id = useSelector((state) => state.session.user.id)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [image_url, setimage_url] = useState("");

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateZipCode = (e) => setZipCode(e.target.value);
  const updateImageUrl = (e) => setimage_url(e.target.value);


  useEffect(() => {
    dispatch(getBusinessTypes());
  }, [dispatch]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let type_id = 1;
    const payload = {
      owner_id,
      title,
      description,
      address,
      city,
      type_id,
      state,
      zipCode,
      image_url,
    };
    const createdBusiness = await dispatch(createBusiness(payload));

    hideForm();

    // let createdBusiness;
    // try {
    //     createdBusiness = await dispatch(createBusiness(payload));
    // } catch (error) {
    //     if (error instanceof ValidationError) setErrorMessages(error.errors);
    //     else setErrorMessages({ overall: error.toString().slice(7) })
    // }


    // if (createdBusiness) {
    //   setErrorMessages({});
    // }
  };
  return (
    <section className="new-form-holder centered middled">
      <form className="create-business-form" onSubmit={handleSubmit}>
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
        <button className="create-new-business-button" type="submit">Create new Business</button>
      </form>
    </section>
  );
};

export default CreateBusinessForm;
