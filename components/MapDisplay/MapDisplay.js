import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab } from 'native-base';
import GetUsers from '../GroupView/GetUsers.js';
import firebaseRef from '../../firebase/config.js';
import firebase from 'firebase';
import MapView from 'react-native-maps';

const firebasedb = firebase.database();

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MapView style={{width: 375, height: 375}}
      initialRegion={{
        latitude: this.props.user.location.coords.latitude,
        longitude: this.props.user.location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}/>
    );
  }
}

MapDisplay.propTypes = {
  user: React.PropTypes.object.isRequired,
};
