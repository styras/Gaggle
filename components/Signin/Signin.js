import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab } from 'native-base';
import GroupView from './../../components/GroupView/GroupView.js';
import firebaseRef from '../../firebase/config.js';

export default class Signin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
      user: undefined
    };

    firebaseRef.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user: user})
        this._handleChangePage();
      }
    })

    this._handleChangePage = this._handleChangePage.bind(this);
    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.logout = this.logout.bind(this);
  }

  // _handleChangePage() {
  //   this.props.navigator.push({
  //     component: GroupView,
  //     title: 'Group Members'
  //   });
  // }

  _handleChangePage(next) {
    this.props.navigator.push(next);
  }

  signup () {
    firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {console.log(`Error ${error}`)});
    // use let user = firebaseRef.auth().currentUser; 
    // to add properties to the current user. Specifically,
    // location of the user.
  }

  signin () {
    firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {console.log(`Error ${error}`)})
  }

  logout () {
    firebaseRef.auth().signOut().then(() => {
      console.log("Sign-out Successful.")
    }, (error) => {
      console.log("Sign-out failed.")
    })
  }

  render() {
    const nextRoute = {
      component: GroupView,
      title: 'Group Members',
      passProps: {
        user: this.state.user
      }
    }

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
            <Button onPress={() => this._handleChangePage(nextRoute)}>
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