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
      password: ''
    };
    this._handleChangePage = this._handleChangePage.bind(this);
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
  }

  login () {

  }

  render() {
    const nextRoute = {
      component: GroupView,
      title: 'Group Members'
    }
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content>
          <Form>
            <Item regular>
              <Input
                placeholder="Username"
              />
              <Icon name='checkmark-circle'/>
            </Item>
            <Item regular>
              <Input
                placeholder="Password" />
            </Item>
          </Form>
          <Button block>
            <Text>Sign-up</Text>
          </Button>
          <Button block>
            <Text>Log-in</Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => this._handleChangePage(nextRoute)}>
              <Text>Next Page</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}