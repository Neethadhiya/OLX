import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import { FirebaseContext, AuthContext } from '../../store/Context';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const date = new Date();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = () => {
    if (!name || !category || !price || images.length === 0) {
      setError('Please fill all the fields and select at least one image');
      return;
    }

    Promise.all(
      images.map((image) =>
        firebase.storage().ref(`/images/${image.name}`).put(image)
      )
    )
      .then((uploadedImages) =>
        Promise.all(
          uploadedImages.map((uploadTaskSnapshot) =>
            uploadTaskSnapshot.ref.getDownloadURL()
          )
        )
      )
      .then((imageUrls) => {
        const productData = {
          name,
          category,
          price,
          images: imageUrls,
          userId: user.uid,
          createdAt: date.toDateString(),
        };

        firebase
          .firestore()
          .collection('products')
          .add(productData)
          .then(() => {
            history.push('/');
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <br />
          {images.map((image, index) => (
            <img
              key={index}
              alt={`Preview ${index + 1}`}
              width="70px"
              height="70px"
              margin ="5px"
              src={URL.createObjectURL(image)}
            />
          ))}
          <br />
          <input type="file" multiple onChange={handleImageChange} name="image" />
          <br />
          <button className="uploadBtn" onClick={handleSubmit}>
            Upload and Submit
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
