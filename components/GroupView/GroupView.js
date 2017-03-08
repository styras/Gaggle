import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { firebaseDB, updateUserLocation, getAllGroupsInUser, removeUserFromGroup } from '../../firebase/firebaseHelpers';
import GroupMapChat from '../GroupMapChat/GroupMapChat';
import CreateJoinGroup from './CreateJoinGroup';
import GroupList from './GroupList';
import Quiz from '../Quiz/Quiz';

export default class GroupView extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: this.props.user,
      users: [],
      activeGroup: 'Default',
    };

    this.groupsArray = getAllGroupsInUser(this.state.user.uid);
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
      rightButtonTitle: 'Quiz',
      onRightButtonPress: () => this.props.navigator.push({
        component: Quiz,
        title: 'While You Wait...',
      }),
    });
  }

  deleteGroup(uid, groupName) {
    Alert.alert(
      'Delete Group',
      `Are you sure you want to remove yourself from ${groupName}?`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
        { text: 'Yes', onPress: () => removeUserFromGroup(uid, groupName), style: 'destructive' },
      ],
    );
  }

  _usersListener() {
    this.usersRef.on('value', (snapshot) => {
      const usersArray = [];
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
          {this.groupsArray.length === 0 &&
            <Text
              style={{
                color: 'grey',
                textAlign: 'center',
                marginVertical: 10,
              }}
            >To join a group, just type in the name, and click Join!</Text>}
          <CreateJoinGroup user={this.state.user} />
          <GroupList
            _handleChangePage={this._handleChangePage}
            userGroups={getAllGroupsInUser(this.state.user.uid)}
            deleteGroup={this.deleteGroup}
            uid={this.state.user.uid}
          />
        </Content>
      </Container>
    );
  }
}

GroupView.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};