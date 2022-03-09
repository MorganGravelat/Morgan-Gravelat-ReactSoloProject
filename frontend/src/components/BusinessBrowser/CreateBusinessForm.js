import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const CreateBusinessForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const businessTypes = useSelector(state => state.business.types);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const updateTitle = (e) => setTitle(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateType = (e) => setType(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateZipCode = (e) => setZipCode(e.target.value);
    const updateImageUrl = (e) => setImageUrl(e.target.value);


    const handleSubmit = async (e) => {
      e.preventDefault();

      const payload = {
        title,
        description,
        address,
        city,
        type,
        state,
        zipCode,
        imageUrl,
      };

      let createdBusiness;

        createdBusiness = await dispatch(createBusiness(payload));

      if (createdBusiness) {
        history.push(`/`);
        hideForm();
      }
    };

    const handleCancelClick = (e) => {
      e.preventDefault();
      setErrorMessages({});
      hideForm();
    };

    return (
        <section className="new-form-holder centered middled">
            <form className="create-Business-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    required
                    value={title}
                    onChange={updateTitle} />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={updateDescription} />
                <input
                    type="text"
                    placeholder="Address"
                    required
                    value={address}
                    onChange={updateAddress} />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={updateCity} />
                <select
                    value={move1}
                    onChange={updateMove1}
                >
                    {}
                </select>
                <input
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={updateState} />
                <input
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={updateZipCode} />
                <input
                  type="text"
                  placeholder="Image Address"
                  value={imageUrl}
                  onChange={updateImageUrl} />
                <button type="submit">Create new Business</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
  };

  export default CreateBusinessForm;
