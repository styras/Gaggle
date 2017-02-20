import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';
import Signin from './components/Signin/Signin.js';

export default class Gaggle extends Component {
  render() {
    return (
      <NavigatorIOS ref="nav"
        style={styles.wrapper}
        initialRoute={{
          component: Signin,
          title: 'Signin'
        }}
      />
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});

AppRegistry.registerComponent('Gaggle', () => Gaggle);
