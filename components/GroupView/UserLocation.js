import {Text, View} from 'react-native';
import React from 'react';

export default class UserLocation extends React.Component {
  state = {
    lastPosition: 'unknown'
  };

  watchID: ?number = null;

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      //var lastPosition = JSON.stringify(position);
      var lastPosition = [position.coords.longitude, position.coords.latitude];
      this.setState({lastPosition});
      //console.log(JSON.parse(this.state.lastPosition));
      console.log(JSON.stringify(position));
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text>
          <Text>Longitude: </Text>
          {this.state.lastPosition[0]}
        </Text>
        <Text>
          <Text>Latitude: </Text>
          {this.state.lastPosition[1]}
        </Text>
      </View>
    );
  }
}