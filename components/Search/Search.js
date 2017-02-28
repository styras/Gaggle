import React, { Component } from 'react';
import { Container, Header, Content, Text, Form, Item, Input, Button } from 'native-base';

const styles = {
  searchBar: {
    position: 'relative',
    top: -15,
  },
  searchInput: {
    marginLeft: 10,
  },
};

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
          <Header style={styles.searchBar} searchBar rounded>
            <Item>
              <Input style={styles.searchInput} placeholder="Search" />
            </Item>
            <Button transparent>
              <Text>For Me</Text>
            </Button>
            <Button transparent>
              <Text>For Group</Text>
            </Button>
          </Header>
          <Text>Heyo</Text>
        </Content>
      </Container>
    );
  }
}
