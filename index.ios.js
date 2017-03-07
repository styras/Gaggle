import React, { Component } from 'react';
import { AppRegistry, StyleSheet, NavigatorIOS } from 'react-native';
import Signin from './components/Signin/Signin';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default class Gaggle extends Component {
  render() {
    return (
      <NavigatorIOS
        ref={'nav'}
        style={styles.wrapper}
        initialRoute={{
          component: Signin,
          title: 'Welcom to Gaggle!',
        }}
      />
    );
  }
}

AppRegistry.registerComponent('Gaggle', () => Gaggle);
