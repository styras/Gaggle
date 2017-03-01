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
  firebaseDB.ref(`users/${userObj.uid}/groups`).push(groupName);
};

export const removeUserFromGroup = (uid, groupName) => {
  console.log(uid, `group name`, groupName);
  console.log('firebase ref', firebaseDB.ref(`users/${uid}/groups`));

  firebaseDB.ref(`users/${uid}/groups`);
  // firebaseDB.ref(`groups/${groupName}/members/${uid}`).remove();
}

export const getAllGroupsInUser = (uid) => {
  const arrayOfGroups = [];

  firebaseDB.ref(`users/${uid}/groups`).on('value', (snapshot) => {
    const groupsObj = snapshot.val();

    for (let key in groupsObj) {
      arrayOfGroups.push(groupsObj[key]);
    }
  }, (error) => { console.log(`Error getting groups ${error}`); });

  return arrayOfGroups;
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
  let location = {};
  navigator.geolocation.getCurrentPosition((position) => {
    location = position;
    const userID = getCurrentUserId();
    const user = getCurrentUser();

    let updates = {};
    updates[`users/${user.uid}/location/`] = location;
    updates[`groups/${activeGroup}/members/${user.uid}`] = {
      uid: user.uid,
      displayName: user.displayName,
      location: location,
    };

    firebaseDB.ref().update(updates)
      .then(() => {
        console.log('Location update successful!');
        return location;
      })
      .catch((error) => { console.log(`Location update Error ${error}`); });
  },
    // Relates to geolocation position initiated above
    (error) => alert(JSON.stringify(error)),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
  )
};

// Moved directly into MapDisplay to setState on the component whenever value is updated
// export const getMemberLocations = (activeGroup) => {
//   const locArray = [];
//   firebaseDB.ref(`groups/${activeGroup}/members/`).on('value', (snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       locArray.push(childSnapshot.val());
//     });
//   });
//  console.log('getMemberLocations LOCATIONS ARRAY', locArray);
//  return locArray;
// };
export const getGroupMemberLocations = groupName => (
  new Promise((resolve, reject) => {
    const locationsArray = [];
    firebaseDB.ref(`groups/${groupName}/members/`).once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const memberLocationObj = childSnapshot.val().location.coords;
        const location = [memberLocationObj.latitude, memberLocationObj.longitude];
        locationsArray.push(location);
      });
    })
    .then(() => {
      resolve(locationsArray);
    })
    .catch(err => reject(err));
  })
);
