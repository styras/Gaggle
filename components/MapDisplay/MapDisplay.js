import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import { firebaseRef, firebaseDB, updateUserLocation, getMemberLocations } from '../../firebase/firebaseHelpers';
import { getUserLocation } from '../../location/locationHelpers.js';
import duck_emoji from '../../images/duck_emoji_smaller.png';

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLoc: '',
      markersArray: []
    };
  }

  randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  getMemberLocations(activeGroup) {
    const context = this;
    firebaseDB.ref(`groups/${activeGroup}/members/`).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.state.markersArray.push({coordinate: {
          latitude: childSnapshot.val().location.coords.latitude,
          longitude: childSnapshot.val().location.coords.longitude,
          },
          displayName: childSnapshot.val().displayName,
        }
        );
      });
      this.setState({
        markersArray: this.state.markersArray,
      })
    });
  }

  componentWillMount() {
    this.getMemberLocations(this.props.groupName);
    getUserLocation().then((response) => {
      this.setState({
        currLoc: response,
      })
    })
  }

  render() {
    const { width, height } = Dimensions.get('window');

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
              image= {duck_emoji}
              pinColor={this.randomColor()}
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
  }

}

MapDisplay.propTypes = {
  user: React.PropTypes.object.isRequired,
};

