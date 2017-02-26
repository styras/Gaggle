import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { firebaseRef, firebaseDB, updateUserLocation, getMemberLocations } from '../../firebase/firebaseHelpers';

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLoc: '',
      userLocArray: [],
    };
  }

  randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  getMemberLocations(activeGroup) {
    const context = this;
    firebaseDB.ref(`groups/${activeGroup}/members/`).once('value', (snapshot) => {
      const locArray = [];
      snapshot.forEach((childSnapshot) => {
        locArray.push(childSnapshot.val());
      });
      //console.log('getMemberLocations LOCATIONS ARRAY', locArray);
      context.setState({
        userLocArray: locArray,
      });
    });
  }

  componentWillMount() {
    this.getMemberLocations(this.props.groupName);
    var location = updateUserLocation(this.props.groupName);
    this.setState({
      currLoc: location,
      userLocArray: [],
    });
      var bob = this.state;
      console.log('bob', bob);
  }

  render() {
    //console.log('MapDisplay userLocArray', this.state.userLocArray);

    const { width, height } = Dimensions.get('window');


    return (

      <View>
        <MapView
          style={{width: width, height: height}}
          initialRegion={{
            latitude: this.props.user.location ? this.props.user.location.coords.latitude : 0,
            longitude: this.props.user.location ? this.props.user.location.coords.longitude : 0,
            // latitude: this.state.currLoc.crd.latitude,
            // latitude: this.state.currLoc.crd.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        {this.state.userLocArray.map((user, i) => (
            <MapView.Marker
              key={i}
              title={user.displayName}
              identifier={user.location.uid}
              coordinate={{ latitude: user.location.coords.latitude, longitude: user.location.coords.longitude }}
              pinColor={this.randomColor()}
            >
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }
}

MapDisplay.propTypes = {
  user: React.PropTypes.object.isRequired,
};

