import firebase from 'firebase';
import config from './config';

export const firebaseRef = firebase.initializeApp(config);
export const firebaseDB = firebaseRef.database();

export const addUserToGroup = (userObj, uid, groupName) => {
  // expect a user object with
  //{
  //  displayName: String,
  //  location: String,
  //}
  firebaseDB.ref(`groups/${groupName}/members/${uid}`).set(userObj);
};

export const getAllUsersInGroup = (groupName) => {
  firebaseDB.ref(`groups/${groupName}/members`).once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};


