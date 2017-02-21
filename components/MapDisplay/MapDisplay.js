import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab } from 'native-base';
import GetUsers from '../GroupView/GetUsers.js';
import firebaseRef from '../../firebase/config.js';
import firebase from 'firebase';
var MapView = require('react-native-maps')

const firebasedb = firebase.database();

export default class MapDisplay extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
  }

  _handleChangePage() {
    this.props.navigator.push({
      component: Chat,
      title: 'Chat'
    });
  }

render() {
  return (
    <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}/>
  );
  }

}