// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b1336.firebaseapp.com",
  projectId: "mern-estate-b1336",
  storageBucket: "mern-estate-b1336.appspot.com",
  messagingSenderId: "1095001323434",
  appId: "1:1095001323434:web:e846d88c2742af6c7f1dd3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);