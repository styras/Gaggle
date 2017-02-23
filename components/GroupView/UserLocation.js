import {Text, View} from 'react-native';
import React from 'react';
import { firebaseRef, firebaseDB } from '../../firebase/firebaseHelpers';


export default class UserLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      longitude: 'unknown',
      latitude: 'unknown'
    };
  }

  _updateUserLocation() {

      let user = firebaseRef.auth().currentUser;

      user.updateProfile({
        location: this.state.lastPosition
      })
      .then(() => {
        let newUserObj = {
          displayName: user.displayName,
          email: user.email,
          location: JSON.parse(this.state.lastPosition),
          uid: user.uid
        };
        //console.log('state before send to DB', this.state);
        //console.log('obj to send to DB', this.state);
        firebaseDB.ref('users/' + user.uid).set(newUserObj);
        console.log('Name set up successful!')
      }, (error) => {
        console.log('Name set up unsuccessful')
      })
      .catch((error) => {console.log(`Error ${error}`)});
  }



  watchID: ?number = null;

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      //var lastPosition = [position.coords.longitude, position.coords.latitude];

      this.setState({
        lastPosition: lastPosition,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, () => this._updateUserLocation());
      //console.log(JSON.parse(this.state.lastPosition));
      //console.log(position);

    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text>
          <Text>Current position: </Text>
          {this.state.lastPosition}
        </Text>
        <Text>
          <Text>Longitude: </Text>
          {this.state.longitude}
        </Text>
        <Text>
          <Text>Latitude: </Text>
          {this.state.latitude}
        </Text>
      </View>
    );
  }
}
