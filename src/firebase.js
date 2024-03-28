import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { useEffect } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB4jFvr4RwyCWC2a825sSFSbenYflYUZek",
  authDomain: "disneyplus-clone-b5407.firebaseapp.com",
  projectId: "disneyplus-clone-b5407",
  storageBucket: "disneyplus-clone-b5407.appspot.com",
  messagingSenderId: "192160298085",
  appId: "1:192160298085:web:151976baa68d4033d0828c",
  measurementId: "G-RCHWVY88DT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };

// const getMovies = () => {
//  fetch("https://api.themoviedb.org/3/discover/movie?api_key=b0b7dcc8f2b0e247aaed0f5a6457d081")
//  .then(res => res.json())
//  .then(json => console.log(json));
// }

// useEffect(() => {
//   getMovies().then(
// }, )