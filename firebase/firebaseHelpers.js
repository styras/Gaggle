import firebase from 'firebase';
import config from './config';

export const firebaseRef = firebase.initializeApp(config);
export const firebaseDB = firebaseRef.database();


export const addUserToGroup = (userObj, groupName) => {
  const user = {
    displayName: userObj.displayName,
    location: userObj.location,
  };

  firebaseDB.ref(`groups/${groupName}/members/${userObj.uid}`).set(user);
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
  let location = '';
  navigator.geolocation.getCurrentPosition((position) => {
    location = position;
    const userID = getCurrentUserId();
    const user = getCurrentUser();

    let updates = {};
    updates[`users/${userID}/location/`] = location;
    updates[`groups/${activeGroup}/members/${userID}`] = {
      uid: userID,
      displayName: user.displayName,
      location: location,
    };

    firebaseDB.ref().update(updates)
      .then(() => {
        console.log('Location update successful!');
      })
      .catch((error) => { console.log(`Location update Error ${error}`); });
  },
    // Relates to geolocation position initiated above
    (error) => alert(JSON.stringify(error)),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  );
  return location;
};

// May need to be moved directly into MapDisplay to setState on the component whenever value is updated
// because this function seems to only return once
// export const getMemberLocations = (activeGroup) => {
//   const locArray = [];
//   firebaseDB.ref(`groups/${activeGroup}/members/`).once('value', (snapshot) => {
//     //const locArray = [];
//     snapshot.forEach((childSnapshot) => {
//       locArray.push(childSnapshot.val());
//     });
//     console.log('getMemberLocations LOCATIONS ARRAY', locArray);
//     return locArray;
//   });
// };



