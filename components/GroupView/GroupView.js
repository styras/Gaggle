import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab } from 'native-base';
import GetUsers from './GetUsers.js';

//ListView.dataSource
//Fetch to get api data

export default class GroupView extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
    this.state = {
      users: []
    };
  }

  _handleChangePage() {
    this.props.navigator.pop();
  }

  componentDidMount() {
    GetUsers.call(this);
  }

  render() {

    const userList = this.state.users.map((user) => {
      return (
        <View>
          <Text> {'\u2022'} {user}</Text>
          <Text></Text>
        </View>
      )
    });

    return (
      <Container>
        <Header>
          <Left></Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content>
          <View>
            {userList}
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this._handleChangePage}>
              <Text>Go Back</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
