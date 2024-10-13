import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBj_rzVCBTKZiiszdcpn9mRG1IhHIZjxkk",
    authDomain: "destion-innovations.firebaseapp.com",
    projectId: "destion-innovations",
    storageBucket: "destion-innovations.appspot.com",
    messagingSenderId: "1018685253721",
    appId: "1:1018685253721:web:2e8cd1d1c3e8a0efc16948",
    measurementId: "G-YEKCXDFSXK"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };