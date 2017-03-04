import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Container, Header, Content } from 'native-base';
import { firebaseDB, updateUserLocation, getAllGroupsInUser, removeUserFromGroup } from '../../firebase/firebaseHelpers';
import GroupMapChat from '../GroupMapChat/GroupMapChat';
import CreateJoinGroup from './CreateJoinGroup';
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
