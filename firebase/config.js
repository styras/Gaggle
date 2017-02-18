import firebase from 'firebase';

let config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  storageBucket: "",
  messagingSenderId: ""
};

export default firebaseRef = firebase.initializeApp(config);