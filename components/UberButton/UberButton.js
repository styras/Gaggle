import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Container, Header, Text, Button } from 'native-base';

export default class UberButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Button clicked');
  }

  render() {
    return (
      <Container>
        <Header />
        <Button onPress={this.handleClick}><Text>UberButton</Text></Button>
      </Container>
    );
  }
}
