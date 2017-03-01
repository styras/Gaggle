import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { firebaseDB } from '../../firebase/firebaseHelpers';
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
    setTimeout(function () {
      const markers = context.state.markersArray.map(function (marker) {
        return marker.displayName;
      });
      map.fitToSuppliedMarkers(markers, false);
    }, 2000);

    setInterval(function () {
      const markers = context.state.markersArray.map(function (marker) {
        return marker.displayName;
      });
      getUserLocation()
      .then((response) => {
        context.setState({
          currLoc: response,
        });
      });
      map.fitToSuppliedMarkers(markers, false);
    }, 10000);
  }

  getMemberLocations(activeGroup) {
    firebaseDB.ref(`groups/${activeGroup}/members/`).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.markersArray.push({ coordinate: {
          latitude: childSnapshot.val().location.coords.latitude,
          longitude: childSnapshot.val().location.coords.longitude,
        },
          displayName: childSnapshot.val().displayName,
        });
      });
      this.setState({
        markersArray: this.state.markersArray,
      });
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const emojis = [duckYellow, duckBlue, duckGreen, duckPurple, duckRed];

    return (
      <View>
        <MapView
          ref="mymap"
          style={{ width: width, height: height }}
          initialRegion={{
            latitude: this.state.currLoc ? this.state.currLoc[0] : 0,
            longitude: this.state.currLoc ? this.state.currLoc[1] : 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.markersArray.map((marker, i) => (
          <MapView.Marker
            key={i}
            title={marker.displayName}
            identifier={marker.displayName}
            coordinate={{ latitude: marker.coordinate.latitude,
              longitude: marker.coordinate.longitude }}
            image={emojis[(5 + i) % 5]}
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

