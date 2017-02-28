import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Container, Header, Footer, Content, Button, FooterTab, Text, Icon } from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';
import { firebaseDB, updateUserLocation, getAllGroupsInUser } from '../../firebase/firebaseHelpers';
import GroupMapChat from '../GroupMapChat/GroupMapChat';
import UberButton from '../UberButton/UberButton';
import CreateJoinGroup from './CreateJoinGroup';
<<<<<<< HEAD
import Search from '../Search/Search';

const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
=======
import Suggestions from '../Suggestions/Suggestions';
import GroupList from './GroupList';
>>>>>>> Correct Sign in bug, modularize GroupList component, and restore working group links

export default class GroupView extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
    this.state = {
      user: this.props.user,
      users: [],
      activeGroup: 'Default',
    };

    this.usersRef = firebaseDB.ref('/users');
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
      rightButtonTitle: 'Search',
      onRightButtonPress: () => {
        this.props.navigator.push({
          component: Search,
          title: 'Explore the Area',
          passProps: {
            groupName: name,
          },
        });
      },
    });
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
          />
          <Button
            block
            danger
            style={{ margin: 10 }}
          >
            <Text>Leave a Group?</Text>
          </Button>
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
