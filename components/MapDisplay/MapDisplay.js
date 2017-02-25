import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { firebaseDB, updateUserLocation } from '../../firebase/firebaseHelpers';

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
    this.setState({
      currLoc: updateUserLocation(this.props.groupName),
    });
    //console.log('STATE inside MapDisplay', this.state);
  }

  render() {
    console.log('MapDisplay userLocArray', this.state.userLocArray);

    //const placeMarkers = this.state.userLocArray.map((user, i) => {
    //console.log('USER', user);
    //console.log('LAT/LONG', { latitude: user.location.coords.latitude, longitude: user.location.coords.longitude });
    // let coords = { latitude: user.location.coords.latitude, longitude: user.location.coords.longitude };
    //   return (
    //     <View key={i}>
    //       <MapView.Marker
    //         title={user.location.displayName}
    //         identifier={user.location.uid}
    //         coordinate={coords}
    //         pinColor={this.randomColor()}
    //        />
    //     </View>
    //   );
    // });
    // console.log('PLACEMARKERS', placeMarkers);

    const { width, height } = Dimensions.get('window');

    return (
      <View>
        <MapView
          style={{width: width, height: height}}
          initialRegion={{
            latitude: this.props.user.location ? this.props.user.location.coords.latitude : 0,
            longitude: this.props.user.location ? this.props.user.location.coords.longitude : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        {this.state.userLocArray.map((user, i) => (
            <MapView.Marker
              key={i}
              title="This is a native view"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation" // eslint-disable-line max-len
              identifier={user.location.uid}
              coordinate={{ latitude: user.location.coords.latitude, longitude: user.location.coords.longitude }}
              pinColor={this.randomColor()}
            >
              <MapView.Callout
                title={user.location.displayName}
              />
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

