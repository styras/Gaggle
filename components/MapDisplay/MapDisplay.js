import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { firebaseDB, updateUserLocation } from '../../firebase/firebaseHelpers';
import { getUserLocation } from '../../location/locationHelpers';
import duckYellow from '../../images/duck_emoji_smaller.png';
import duckBlue from '../../images/duck_emoji_smaller_blue.png';
import duckGreen from '../../images/duck_emoji_smaller_green.png';
import duckPurple from '../../images/duck_emoji_smaller_purple.png';
import duckRed from '../../images/duck_emoji_smaller_red.png';

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLoc: '',
      markersArray: [],
    };
  }

  componentWillMount() {
    this.getMemberLocations(this.props.groupName);
    getUserLocation().then((response) => {
      this.setState({
        currLoc: response,
      });
    });
  }

  componentDidMount() {
    const map = this.refs.mymap;
    const context = this;

    this._fitToSuppliedMarkers = setTimeout(() => {
      const markers = context.state.markersArray.map(marker => marker.displayName);
      map.fitToSuppliedMarkers(markers, true);
    }, 2000);

    this._updateUserLocation = setInterval(() => {
      updateUserLocation(this.props.groupName);
    }, 15000);

    this._updateMemberLocations = setInterval(() => {
      this.getMemberLocations(this.props.groupName);
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this._updateUserLocation);
    clearInterval(this._updateMemberLocations);
    clearTimeout(this._fitToSuppliedMarkers);
  }

  getMemberLocations(activeGroup) {
    const markersArray = [];

    firebaseDB.ref(`groups/${activeGroup}/members/`).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        markersArray.push({ coordinate: {
          latitude: childSnapshot.val().location.coords.latitude,
          longitude: childSnapshot.val().location.coords.longitude,
        },
          displayName: childSnapshot.val().displayName,
        });
      });
      this.setState({ markersArray });
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const emojis = [duckYellow, duckBlue, duckGreen, duckPurple, duckRed];

    return (
      <View>
        <MapView
          ref="mymap"
          style={{ width, height }}
          initialRegion={{
            latitude: this.state.currLoc ? this.state.currLoc[0] : 0,
            longitude: this.state.currLoc ? this.state.currLoc[1] : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
        >
          {this.state.markersArray.map((marker, i) => (
            <MapView.Marker
              key={i}
              title={marker.displayName}
              identifier={marker.displayName}
              coordinate={{ latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude }}
              image={emojis[(5 + i) % 5]}
            />
        ))}
        </MapView>
      </View>
    );
  }
}

MapDisplay.propTypes = {
  groupName: React.PropTypes.string.isRequired,
};
