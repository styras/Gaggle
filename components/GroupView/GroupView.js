import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab } from 'native-base';
import Chat from '../Chat/Chat.js';

export default class SecondPage extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
  }

  _handleChangePage() {
    this.props.navigator.push({
      component: Chat,
      title: 'Chat'
    });
  }

  render() {
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content>
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
