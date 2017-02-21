import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab } from 'native-base';
import GroupView from './../../components/GroupView/GroupView.js';
import firebaseRef from '../../firebase/config.js';

const firebasedb = firebaseRef.database();

export default class Signin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: ''
    };

    firebaseRef.auth().onAuthStateChanged((user) => {

      if(user) {
        let userObj = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        }
        this.handleChangePage(userObj);
      }
    })

    this.handleChangePage = this.handleChangePage.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChangePage(user) {
    this.props.navigator.push({
      component: GroupView,
      title: 'Group Members',
      passProps: {
        user: user
      }
    });
  }

  signup() {
    firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      let user = firebaseRef.auth().currentUser;
      let displayName = user.email.split('@')[0];

      user.updateProfile({
        displayName: displayName
      })
      .then(() => {
        let newUserObj = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        };

        firebasedb.ref('users/' + user.uid).set(newUserObj);     
        console.log("Name set up successful!")
      }, (error) => {
        console.log("Name set up unsuccessful")
      })
      
    })
    .catch((error) => {console.log(`Error ${error}`)});
  }

  signin() {
    firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch((error) => {console.log(`Error ${error}`)})
  }

  logout() {
    firebaseRef.auth().signOut().then(() => {
      console.log("Sign-out Successful.")
    }, (error) => {
      console.log("Sign-out failed.")
    })
  }

  render() {

    return (
      <Container >
        <Header></Header>
        <Content style={{padding: 10}}>
          <Form>
            <Item regular>
              <Input
                onChangeText={(text) => this.setState({email: text})}
                placeholder="Username"
                autoCapitalize="none"
              />
              <Icon name='checkmark-circle'/>
            </Item>
            <Item regular>
              <Input
                onChangeText={(text) => this.setState({password: text})}
                placeholder="Password"
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </Item>
          </Form>
          <Button onPress={this.signup}>
            <Text>Sign up</Text>
          </Button>
          <Button onPress={this.signin}>
            <Text>Sign in</Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.handleChangePage}>
              <Text>Next Page</Text>
            </Button>
            <Button onPress={this.logout}>
              <Text>Log out</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}