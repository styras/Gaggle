import React, { Component } from 'react';
import MapView from 'react-native-maps';

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapView
        style={{ width: 375, height: 375 }}
        initialRegion={{
          latitude: this.props.user.location ? this.props.user.location.coords.latitude : 0,
          longitude: this.props.user.location ? this.props.user.location.coords.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

MapDisplay.propTypes = {
  user: React.PropTypes.object.isRequired,
};
