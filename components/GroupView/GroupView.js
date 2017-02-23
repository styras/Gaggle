import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Footer, Content, Button, FooterTab, Text } from 'native-base';
import { firebaseRef, firebaseDB, updateUserLocation } from '../../firebase/firebaseHelpers';
import GroupMapChat from '../GroupMapChat/GroupMapChat';

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
      users: [],
    };

    this.usersRef = firebaseDB.ref('/users');
  }

  componentWillMount() {
    this._usersListener();
    console.log('user location function', updateUserLocation);
    updateUserLocation();
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

  _usersListener() {
    const context = this;
    this.usersRef.on('value', (snapshot) => {
      const usersArray = [];
      snapshot.forEach((childSnapshot) => {
        usersArray.push(childSnapshot.val());
      });
      context.setState({ users: usersArray });
    });
  }

  render() {
    const userList = this.state.users.map(user =>
      (
        <View style={styles.li} key={user.uid}>
          <Text>{user.displayName}</Text>
          <Text>Location: {user.location ? user.location.coords.longitude : 'null'}, {user.location ? user.location.coords.latitude : 'null'}</Text>
        </View>
      ),
    );

    return (
      <Container>
        <Header />
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

GroupView.propTypes = {
  navigator: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
};
