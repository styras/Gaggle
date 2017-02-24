import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Container, Header, Text, Button } from 'native-base';

export default class UberButton extends Component {


  render() {
    return (
      <Container>
        <Header />
        <Button><Text>UberButton</Text></Button>
      </Container>
    );
  }
}
