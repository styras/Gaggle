import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import GroupView from './GroupView.js';

export default GetUsers = function() {
  var url = 'https://catfacts-api.appspot.com/api/facts?number=5';

  return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        users: responseJson.facts //update when we move to firebase data
      })
    })
    .catch((error) => {
      console.error(error);
    });
};