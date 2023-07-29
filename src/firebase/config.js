import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firebase'
import 'firebase/storage'
// import { createContext } from 'react';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwU_pf0KUvx8Pprtya_Sj_8nyZ7NGYWR4",
    authDomain: "olx-clone-59ee8.firebaseapp.com",
    projectId: "olx-clone-59ee8",
    storageBucket: "olx-clone-59ee8.appspot.com",
    messagingSenderId: "317263784144",
    appId: "1:317263784144:web:cb4472c96665d07dae56d5",
    measurementId: "G-DYMYHDB3BX"
  };
export default firebase.initializeApp(firebaseConfig)
// export default Firebase = firebase.initializeApp(firebaseConfig)

// Initialize Firebase app
// firebase.initializeApp(firebaseConfig);

// export default firebase;
