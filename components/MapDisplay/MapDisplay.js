import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab } from 'native-base';
import GetUsers from '../GroupView/GetUsers.js';
import firebaseRef from '../../firebase/config.js';
import firebase from 'firebase';
import MapView from 'react-native-maps';

const firebasedb = firebase.database();

export default class MapDisplay extends Component {
  constructor(props, context) {
    super(props, context);
  }

render() {
  return (
    <MapView style={{width: 400, height: 400}}
    initialRegion={{
      latitude: 38.543383,
      longitude: -121.435119,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}/>
  );
  }

}