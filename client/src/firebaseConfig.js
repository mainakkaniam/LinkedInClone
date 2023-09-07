// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJGbQJImzBAqhuc88VnUL6-5V4yZ5vUC8",
  authDomain: "linkedin-69393.firebaseapp.com",
  projectId: "linkedin-69393",
  storageBucket: "linkedin-69393.appspot.com",
  messagingSenderId: "1064623459399",
  appId: "1:1064623459399:web:5c64c6d442f56c667f3562"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);//very imp
const auth = getAuth(app);//very very imp since here the firebase in the project gets connected to the firebase app over the internet
const db=getFirestore(app);
export { app, auth,db };