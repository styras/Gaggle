import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { getUserLocation } from '../../location/locationHelpers';

export default class Minimap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: [0, 0],
    };
    getUserLocation().then((myLocation) => {
      this.setState({ myLocation });
    });
  }

  componentDidUpdate() {
    // Hacky way to animate to fitToElements
    setTimeout(() => this.refs.map.fitToElements(true), 1500);
  }

  render() {
    return (
      <MapView
        ref='map'
        style={{ height: 150, width: 375 }}
        region={{
          latitude: this.props.coords[0],
          longitude: this.props.coords[1],
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation
      >
        <MapView.Marker
          coordinate={{ latitude: this.props.coords[0], longitude: this.props.coords[1] }}
          title={'Some place'}
        />
      </MapView>
    );
  }
}

Minimap.propTypes = {
  coords: React.PropTypes.array.isRequired,
};
