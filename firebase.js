// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "flashcard-saas-5269a.firebaseapp.com",
  projectId: "flashcard-saas-5269a",
  storageBucket: "flashcard-saas-5269a.appspot.com",
  messagingSenderId: "415767154103",
  appId: "1:415767154103:web:8a384ccdd96ee7d93eec32",
  measurementId: "G-J5401GGZ7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);