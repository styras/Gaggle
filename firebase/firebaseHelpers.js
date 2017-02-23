import firebase from 'firebase';
import config from './config';

export const firebaseRef = firebase.initializeApp(config);
export const firebaseDB = firebaseRef.database();
