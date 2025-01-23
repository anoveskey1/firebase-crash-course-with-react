// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
    apiKey: "AIzaSyAPTTefdwlqqABu1aLNkAhq2Ekuh61VFIM",
    authDomain: "fir-crash-course-w-react.firebaseapp.com",
    projectId: "fir-crash-course-w-react",
    storageBucket: "fir-crash-course-w-react.firebasestorage.app",
    messagingSenderId: "428273459409",
    appId: "1:428273459409:web:283a5aacc4e153f643e5f0",
    measurementId: "G-DN71LMDFCQ"
};

// Initialize Firebase
const app = initializeApp(firebase);
const analytics = getAnalytics(app);