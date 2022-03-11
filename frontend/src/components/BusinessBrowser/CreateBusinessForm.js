import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessTypes, createBusiness } from "../../store/business";
import { ValidationError } from '../../utils/validationError';
import ErrorMessage from './ErrorMessage';

const CreateBusinessForm = ({ hideForm }) => {
  const dispatch = useDispatch();
  const businessTypes = useSelector((state) => state.business.types);
  const owner_id = useSelector((state) => state.session.user.id)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState(businessTypes[0]);
  const [typeId, setTypeId] = useState(businessTypes[0])
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [image_url, setimage_url] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateType = (e) => setType(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateZipCode = (e) => setZipCode(e.target.value);
  const updateImageUrl = (e) => setimage_url(e.target.value);
    // function getTypeId () {
    //     for (let i = 0; i < businessTypes.length; i++) {
    //         let ele = businessTypes[i];
    //         console.log('running?',ele.business.type);
    //         if (type == ele.business_type) {
    //             setTypeId(ele.id);
    //         }
    //     }
    // }
let type_id = type?.id

  useEffect(() => {
    dispatch(getBusinessTypes());
  }, [dispatch]);

  useEffect(() => {
    if (businessTypes.length && !type) {
      setType(businessTypes[0]);
    }
  }, [businessTypes, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <ErrorMessage message={errorMessages.overall} />
      <form className="create-Business-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle}
        />
        <ErrorMessage label={"Title"} message={errorMessages.title} />
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
        <button type="submit">Create new Business</button>
      </form>
    </section>
  );
};

export default CreateBusinessForm;
