import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBqqHDMdQchFkMjIghR9bdsSw23RNGK40s",
  authDomain: "react-crud-816df.firebaseapp.com",
  projectId: "react-crud-816df",
  storageBucket: "react-crud-816df.appspot.com",
  messagingSenderId: "479427756400",
  appId: "1:479427756400:web:47cede134ab81850188fb5",
  measurementId: "G-NBVXGMSENV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
