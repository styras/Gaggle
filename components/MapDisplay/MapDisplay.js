import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { firebaseRef, firebaseDB, updateUserLocation, getMemberLocations } from '../../firebase/firebaseHelpers';
import { getUserLocation } from '../../location/locationHelpers.js';
import duck_yellow from '../../images/duck_emoji_smaller.png';
import duck_blue from '../../images/duck_emoji_smaller_blue.png';
import duck_green from '../../images/duck_emoji_smaller_green.png';
import duck_purple from '../../images/duck_emoji_smaller_purple.png';
import duck_red from '../../images/duck_emoji_smaller_red.png';

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLoc: '',
      markersArray: [],
    }
  };

  getMemberLocations(activeGroup) {
    const context = this;
    firebaseDB.ref(`groups/${activeGroup}/members/`).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.markersArray.push({coordinate: {
          latitude: childSnapshot.val().location.coords.latitude,
          longitude: childSnapshot.val().location.coords.longitude,
          },
          displayName: childSnapshot.val().displayName,
        });
      });
      this.setState({
        markersArray: this.state.markersArray,
      })
    });
  }


  // getInitialState() {
  //   return {
  //     region: {
  //       latitude: 37.78825,
  //       longitude: -122.4324,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     },
  //   };
  // }

  // onRegionChange(region) {
  //   this.setState({ region });
  // }

  componentWillMount() {
    this.getMemberLocations(this.props.groupName);
    getUserLocation().then((response) => {
      this.setState({
        currLoc: response,
      })
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const emojis = [duck_yellow, duck_blue, duck_green, duck_purple, duck_red];

    return (
      <View>
        <MapView
          ref="mymap"
          style={{width: width, height: height}}
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
              coordinate={{latitude: marker.coordinate.latitude, longitude: marker.coordinate.longitude}}
              image={emojis[(5+i)%5]}
            >
            </MapView.Marker>
          ))}
        </MapView>
      </View>
    );
  }

  componentDidMount () {
    var map = this.refs.mymap;
    var context = this;
    setTimeout(function(){
      var markers = context.state.markersArray.map(function(marker){
      return marker.displayName;
      });
      map.fitToSuppliedMarkers(markers, false);
    }, 2000)

    setInterval(function() {
      var markers = context.state.markersArray.map(function(marker){
      return marker.displayName;
      });
      getUserLocation()
      .then((response) => {
        context.setState({
          currLoc: response,
        })
      })
      map.fitToSuppliedMarkers(markers, false);
      console.log('updated location of user')
    }, 10000)
  }
}

MapDisplay.propTypes = {
  user: React.PropTypes.object.isRequired,
};

