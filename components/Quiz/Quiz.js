import React, { Component } from 'react';
import { Container, Content, Header, Text } from 'native-base';

export default class Quiz extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>Quiz game here</Text>
        </Content>
      </Container>
    );
  }
}
