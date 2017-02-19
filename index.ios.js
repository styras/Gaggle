import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} from 'react-native';
import { Container, Header, Content, Button } from 'native-base';
import Signin from './components/Signin/Signin.js';

export default class Gaggle extends Component {
  render() {
    return (
      <NavigatorIOS ref="nav"
        style={styles.wrapper}
        initialRoute={{
          component: Signin,
          title: "Signin"
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    marginTop: 70
  },
  buttonText: {
    color: 'white'
  }
});


AppRegistry.registerComponent('Gaggle', () => Gaggle);
