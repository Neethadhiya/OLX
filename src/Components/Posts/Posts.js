import React, { useEffect, useState, useContext } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom';

function Posts() {
  const { firebase } = useContext(FirebaseContext);
  const { setPostDetails } = useContext(PostContext);
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    firebase.firestore().collection('products').get().then((snapshot) => {
      const allPost = snapshot.docs.map((product) => {
        return {
          ...product.data(),
          id: product.id
        };
      });
      setProducts(allPost);
    });
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards moreViewCards">
          {products.map((product, index) => (
            <div
              className="card"
              onClick={() => {
                setPostDetails(product);
                history.push('/view');
              }}
              key={index}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                {product.url && typeof product.url === 'string' ? (
                  <img src={product.url} alt="" />
                ) : product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                  <img src={product.images[0]} alt="" />
                ) : (
                  <img src="/placeholder-image.jpg" alt="Placeholder" />
                )}
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards recommendationsCards">
          
        {products.map((product, index) => (
            <div
              className="card"
              onClick={() => {
                setPostDetails(product);
                history.push('/view');
              }}
              key={index}
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                {product.url && typeof product.url === 'string' ? (
                  <img src={product.url} alt="" />
                ) : product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                  <img src={product.images[0]} alt="" />
                ) : (
                  <img src="/placeholder-image.jpg" alt="Placeholder" />
                )}
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
