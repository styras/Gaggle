import React, { Component } from 'react';
import { Container, Header, Footer, Content, Form, Item, Input, Icon, Button, FooterTab, Text } from 'native-base';
import { firebaseRef, firebaseDB } from '../../firebase/firebaseHelpers';
import GroupView from './../../components/GroupView/GroupView';

const styles = {
  marginBottom: {
    marginBottom: 10,
  },
};

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showSignUp: true,
    };

    firebaseRef.auth().onAuthStateChanged((user) => {
      if (user) {
        firebaseDB.ref(`users/${user.uid}`).once('value').then((snapshot) => {
          this.handleChangePage(snapshot.val());
          console.log(snapshot.val());
        });
      }
    });

    this.handleChangePage = this.handleChangePage.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChangePage(user) {
    this.props.navigator.push({
      component: GroupView,
      title: 'Group Members',
      leftButtonTitle: 'Log Out',
      onLeftButtonPress: () => {
        this.logout();
        this.props.navigator.pop();
      },
      passProps: {
        user,
      },
    });
  }


  signup() {
    firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      const user = firebaseRef.auth().currentUser;
      const displayName = user.email.split('@')[0];

      user.updateProfile({
        displayName,
      })
      .then(() => {
        const newUserObj = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          // Location may need to be revisited or handled wherever it is set/read
          location: {},
        };

        firebaseDB.ref(`users/${user.uid}`).set(newUserObj).then((snapshot) => {
          this.handleChangePage(snapshot.val());
        });
        console.log('Name set up successful!');
      }, (error) => {
        console.log('Name set up unsuccessful', error);
      });
    })
    .catch((error) => { console.log(`Error ${error}`); });
  }

  signin() {
    firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => { console.log(`Error ${error}`); });
  }

  logout() {
    firebaseRef.auth().signOut().then(() => {
      console.log('Sign-out Successful.');
    }, (error) => {
      console.log('Sign-out failed.', error);
    });
  }

  render() {
    return (
      <Container >
        <Header />
        <Content style={{ padding: 10 }}>
          <Form>
            <Item style={styles.marginBottom} regular>
              <Input
                onChangeText={text => this.setState({ email: text })}
                placeholder="Email"
                autoCapitalize="none"
              />
              {/.+@.+\..+/i.test(this.state.email) && <Icon name={'checkmark-circle'} style={{ color: 'green' }} />}
            </Item>
            <Item regular>
              <Input
                onChangeText={(text) => { this.setState({ password: text }); }}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry
              />
              {this.state.password.length >= 6 && <Icon name={'checkmark-circle'} style={{ color: 'green' }} />}
            </Item>
          </Form>

          {this.state.showSignUp ?
            <Button
              style={{ padding: 5 }}
              onPress={() => this.setState({ showSignUp: false })}
              transparent
            >
              <Text>Already registered?</Text>
            </Button> :
            <Button
              style={{ padding: 5 }}
              onPress={() => this.setState({ showSignUp: true })}
              transparent
            >
              <Text>{'Don\'t have an account?'}</Text>
            </Button>
          }

          {this.state.showSignUp ?
            <Button disabled={this.state.password.length < 6} onPress={this.signup}>
              <Text>Sign up</Text>
            </Button> :
            <Button disabled={this.state.password.length < 6} onPress={this.signin}>
              <Text>Sign in</Text>
            </Button>
          }

        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.handleChangePage}>
              <Text>Next Page</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

Signin.propTypes = {
  navigator: React.PropTypes.object.isRequired,
};
