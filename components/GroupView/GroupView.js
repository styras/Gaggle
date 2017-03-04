import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Container, Header, Footer, Content, Button, FooterTab, Text, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { firebaseDB, updateUserLocation, getAllGroupsInUser, removeUserFromGroup } from '../../firebase/firebaseHelpers';
import GroupMapChat from '../GroupMapChat/GroupMapChat';
import UberButton from '../UberButton/UberButton';
import CreateJoinGroup from './CreateJoinGroup';
import Search from '../Search/Search';
import GroupList from './GroupList';

export default class GroupView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: this.props.user,
      users: [],
      activeGroup: 'Default',
    };

    this.usersRef = firebaseDB.ref('/users');
    this._handleChangePage = this._handleChangePage.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  componentWillMount() {
    this._usersListener();
  }

  componentWillUnmount() {
    this.usersRef.off('value');
  }

  _handleChangePage(name) {
    this.setState({
      activeGroup: name,
    }, () => {
      updateUserLocation(this.state.activeGroup);
    });
    this.props.navigator.push({
      component: GroupMapChat,
      title: `${name} Group`,
      passProps: {
        user: this.props.user,
        groupName: name,
      },
    });
  }

  deleteGroup(uid, groupName) {
    // Alert.alert(
    //   `Are you sure you want to remove yourself from ${groupName}?`,
    //   [
    //     {text: 'Yes', onPress: () => console.log(`I am outta here`), style: 'destructive'},
    //     {text: 'No', onPress: () => console.log(`Psych`)},
    //   ],
    //   {cancelable: false},
    // )
    removeUserFromGroup(uid, groupName);
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
    return (
      <Container>
        <Header />
        <Content>
          <CreateJoinGroup user={this.state.user} />
          <GroupList
            _handleChangePage={this._handleChangePage}
            userGroups={getAllGroupsInUser(this.state.user.uid)}
            deleteGroup={this.deleteGroup}
            uid={this.state.user.uid}
          />
        </Content>
        <Footer>
          <FooterTab />
        </Footer>
      </Container>
    );
  }
}

GroupView.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};
