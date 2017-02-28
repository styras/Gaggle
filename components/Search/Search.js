import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text, Icon, Item, Input, Button } from 'native-base';

const styles = {
  searchBar: {
    position: 'relative',
    top: -15,
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
        <Content scrollEnabled={false}>
          <Header style={styles.searchBar} searchBar rounded>
            <Item>
              <Icon name="search" />
              <Input placeholder="Search" />
            </Item>
            <Button transparent>
              <Text>For Me</Text>
            </Button>
            <Button transparent>
              <Text>For Group</Text>
            </Button>
          </Header>
          <View style={{ position: 'relative', top: -15 }}>
            <Text>Heyo</Text>
          </View>
        </Content>
      </Container>
    );
  }
}
