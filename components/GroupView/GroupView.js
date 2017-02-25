import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Footer, Content, Button, FooterTab, Text } from 'native-base';
import { firebaseDB, updateUserLocation } from '../../firebase/firebaseHelpers';
import GroupMapChat from '../GroupMapChat/GroupMapChat';
import UberButton from '../UberButton/UberButton';
import CreateJoinGroup from './CreateJoinGroup';

const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
});

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
      title: name + ' Group',
      passProps: {
        user: this.props.user,
        groupName: name,
      },
      rightButtonTitle: 'UberButton',
      onRightButtonPress: () => {
        this.props.navigator.push({
          component: UberButton,
          title: 'Uber Button',
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
    const userList = this.state.users.map((user, i) => {
      //console.log('user', user);
      return (
        <View style={styles.li} key={i}>
          <Text>{user.displayName}</Text>
          <Text>Location: {user.location ? user.location.coords.longitude : 'null'}, {user.location ? user.location.coords.latitude : 'null'}</Text>
        </View>
      );
    });

    const userGroups = this.state.user.groups.map((group, i) => {
      return (
        <View key={i}>
          <Button onPress={() => this._handleChangePage(group || '')}>
            <Text>{group}</Text>
          </Button>
        </View>
      );
    });

    return (
      <Container>
        <Header />
        <Content>
          <View>
            <CreateJoinGroup user={this.state.user} />
            <Text>Group Members</Text>
            {userList}
          </View>
          {userGroups}
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this._handleChangePage('Default')}>
              <Text>Default</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

GroupView.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};

