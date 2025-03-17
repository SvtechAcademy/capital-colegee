// src/firebase/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSkznI5LKeQbHUqiuGGtczeVd3zLIMnlY",
  authDomain: "capital-colege.firebaseapp.com",
  projectId: "capital-colege",
  storageBucket: "capital-colege.appspot.com",
  messagingSenderId: "951892383052",
  appId: "1:951892383052:web:17da17d0e5ffe19c712be9",
  measurementId: "G-YTBF5ZYD7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, db, googleProvider, facebookProvider };
