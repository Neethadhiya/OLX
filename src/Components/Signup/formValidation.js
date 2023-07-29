import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useHistory, Link } from 'react-router-dom';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { firebase } = useContext(FirebaseContext);

  const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z]+(\s+[a-zA-Z]+)*$/;
    if (!username) {
      return 'Username is required';
    } else if (!usernameRegex.test(username)) {
      return 'Username is not valid';
    }
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      return 'Email is required';
    } else if (!emailRegex.test(email)) {
      return 'Email is not valid';
    }
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[789]\d{9}$/;
    if (!phone) {
      return 'Mobile is required';
    } else if (!phoneRegex.test(phone)) {
      return 'Mobile is not valid';
    }
    return '';
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{4,20}$/;
    if (!password) {
      return 'Password is required';
    } else if (!passwordRegex.test(password)) {
      return 'Password is not valid';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
    };

    setErrors(validationErrors); // Update errors state

    if (Object.values(validationErrors).some((error) => error !== '')) {
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user
          .updateProfile({ displayName: username })
          .then(() => {
            firebase
              .firestore()
              .collection('users')
              .add({
                id: result.user.uid,
                username: username,
                phone: phone,
              })
              .then(() => {
                history.push('/login');
              });
          });
      })
      .catch((error) => {
        setErrors({ firebase: error.message });
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                username: validateUsername(e.target.value),
              })); // Clear or set error message
            }}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                email: validateEmail(e.target.value),
              })); // Clear or set error message
            }}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <br />
          <label htmlFor="lname">Mobile</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                phone: validatePhone(e.target.value),
              })); // Clear or set error message
            }}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prevErrors) => ({
                ...prevErrors,
                password: validatePassword(e.target.value),
              })); // Clear or set error message
            }}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
