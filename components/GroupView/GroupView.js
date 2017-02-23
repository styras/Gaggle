import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab, Text } from 'native-base';
import GroupMapChat from '../GroupMapChat/GroupMapChat.js';
import GetUsers from './GetUsers.js';
import { firebaseRef, firebaseDB } from '../../firebase/firebaseHelpers';
import MapDisplay from '../MapDisplay/MapDisplay.js';
import UserLocation from './UserLocation.js';
import styles from '../styles.js';

export default class GroupView extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
    this.state = {
      users: [],
    };

    this.usersRef = firebaseDB.ref('/users');
  }

  _handleChangePage() {
    this.props.navigator.push({
      component: GroupMapChat,
      title: 'GroupNameGoesHere',
      passProps: {
        user: this.props.user,
      },
    });
  }

  componentWillMount() {
    this._usersListener();
  }

  _usersListener() {
    this.usersRef.on('value', (snapshot) => {
      let usersArray = [];
      snapshot.forEach((childSnapshot) => {
        usersArray.push(childSnapshot.val());
      });
      this.setState({ users: usersArray });
    }).bind(this);
  }

  render() {
    const userList = this.state.users.map((user, i) => {
      return (
        <View style={styles.li} key={i}>
          <Text>{user.displayName}</Text>
          <Text>Location: {user.location.coords.longitude}, {user.location.coords.latitude}</Text>
          <UserLocation />
        </View>
      );
    });

    return (
      <Container>
        <Header>
          <Left></Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content>
          <View>
          <Text>Group Members</Text>
          {userList}
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this._handleChangePage}>
              <Text>Next Page</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
