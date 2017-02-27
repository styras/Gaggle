import React, { Component } from 'react';
import { Container, Header, Content, Text, Form, Item, Input, Button } from 'native-base';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>Heyo</Text>
        </Content>
      </Container>
    );
  }
}
