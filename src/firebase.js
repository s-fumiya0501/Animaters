// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {gatAuth, getAuth, GoogleAuthProvider} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDBYKMA_bfe0Sl8bU7Zlb6KqqN4xDctQNE",
  authDomain: "practice-nextjs-818b2.firebaseapp.com",
  projectId: "practice-nextjs-818b2",
  storageBucket: "practice-nextjs-818b2.appspot.com",
  messagingSenderId: "665674378003",
  appId: "1:665674378003:web:0f2896fb2a2296ce8188e6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};