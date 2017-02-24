import firebase from 'firebase';
import config from './config';

export const firebaseRef = firebase.initializeApp(config);
export const firebaseDB = firebaseRef.database();


export const addUserToGroup = (userObj, uid, groupName) => {
  // expect a user object with
  // {
  //  displayName: String,
  //  location: String,
  // }
  firebaseDB.ref(`groups/${groupName}/members/${uid}`).set(userObj);
};

export const getAllUsersInGroup = (groupName) => {
  firebaseDB.ref(`groups/${groupName}/members`).once('value')
    .then((snapshot) => {
      return snapshot.val();
    });
};

export const getCurrentUser = () => {
  return firebaseRef.auth().currentUser;
};

export const getCurrentUserId = () => {
  const user = firebaseRef.auth().currentUser;
  return user.uid;
};

export const updateUserLocation = (activeGroup) =>  {
  navigator.geolocation.getCurrentPosition((position) => {
    const location = position;
    const userID = getCurrentUserId();
    const user = getCurrentUser();

    let updates = {};
    updates[`users/${userID}/location/`] = location;
    updates[`groups/${activeGroup}/members/${userID}`] = {
      displayName: user.displayName,
      location: location,
    };

    firebaseDB.ref().update(updates)
      .then(() => {
        console.log('Location update successful!');
      })
      .catch((error) => { console.log(`Location update Error ${error}`); });
  },
    // ORIGINAL F() TO ONLY UPDATE THE USER IN THE DB
    // let userRef = firebaseDB.ref('users/' + userID);
    // userRef.update({ location: location })
    //   .then(() => {
    //     console.log('Location update successful!');
    //   })
    //   .catch((error) => { console.log(`Location update Error ${error}`); });
    // },

    // Relates to geolocation position initiated above
    (error) => alert(JSON.stringify(error)),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );
};

// Need to manually remove event listener wherever this function is invoked
export const getMemberLocations = (activeGroup) => {
  firebaseDB.ref(`groups/${activeGroup}/members/`).on('value', (snapshot) => {
    const locArray = [];
    snapshot.forEach((childSnapshot) => {
      locArray.push(childSnapshot.val());
    });
    console.log('LOCATIONS ARRAY', locArray);
    return locArray;
  });
};
