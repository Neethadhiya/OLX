import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { FirebaseContext } from '../../store/Context';
import './View.css';
import { PostContext } from '../../store/PostContext';

function View() {
  const [userDetails, setUserDetails] = useState();
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (postDetails && postDetails.userId) {
      const { userId } = postDetails;
      firebase.firestore().collection('users').where('id', '==', userId).get().then((res) => {
        res.forEach((doc) => {
          setUserDetails(doc.data());
        });
      });
    }
  }, [postDetails, firebase]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <Slider>
          {postDetails && postDetails.images && postDetails.images.length > 0 ? (
            postDetails.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt="" style={{ width: '470px', height: '470px' }} />
              </div>
            ))
          ) : (
            <div>
              <img src={postDetails?.url} alt="" style={{ width: '480px', height: '480px' }} />
            </div>
          )}
        </Slider>
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price} </p>
          <span>{postDetails?.category}</span>
          <p>{postDetails?.name}</p>
          <span>{postDetails?.createdAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails?.username}</p>
            <p>{userDetails?.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
