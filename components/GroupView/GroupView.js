import React, { Component } from 'react';
import { Alert, Text } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { firebaseDB, updateUserLocation, removeUserFromGroup } from '../../firebase/firebaseHelpers';
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
      groups: [],
      activeGroup: 'Default',
    };

    // set up listener to groups path for syncing state with db
    this.firebaseGroupsRef = firebaseDB.ref(`users/${this.props.user.uid}/groups`);

    this.firebaseGroupsRef.on('value', (snapshot) => {
      const groupsObj = snapshot.val();
      const arrayOfGroups = [];

      for (let key in groupsObj) {
        arrayOfGroups.push(groupsObj[key]);
      }

      this.setState({ groups: arrayOfGroups });
    },
      (error) => { console.log(`Error getting groups ${error}`); }
    );

    this.usersRef = firebaseDB.ref('/users');
    this._handleChangePage = this._handleChangePage.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
  }

  componentWillMount() {
    this._usersListener();
  }

  componentWillUnmount() {
    this.usersRef.off('value');
    this.firebaseGroupsRef.off();
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
          {this.state.groups.length === 0 &&
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
            userGroups={this.state.groups}
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
