/* eslint no-console: 0 */
'use strict';


var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;


export default class UserLocation extends React.Component {
  state = {
    //initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  watchID: ?number = null;

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      //var lastPosition = JSON.stringify(position);
      var lastPosition = [position.coords.longitude, position.coords.latitude];
      this.setState({lastPosition});
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
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Longitude: </Text>
          {this.state.lastPosition[0]}
        </Text>
        <Text>
          <Text style={styles.title}>Latitude: </Text>
          {this.state.lastPosition[1]}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});