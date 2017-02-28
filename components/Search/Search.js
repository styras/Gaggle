import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text, Icon, Item, Input, Button } from 'native-base';

const styles = {
  searchBar: {
    position: 'relative',
    top: -15,
  },
  searchTypeButton: {
    padding: 0,
    marginRight: 5,
  },
};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchForMeOrGroup: true,
      myLocation: [],
    };

    this._getUserLocation();

    this.handleSearchType = this.handleSearchType.bind(this);
  }

  handleSearchType(type) {
    if (type === 'me') {
      this.setState({ searchForMeOrGroup: true });
    } else if (type === 'group') {
      this.setState({ searchForMeOrGroup: false });
    }
  }

  _getUserLocation() {
    const context = this;
    navigator.geolocation.getCurrentPosition((position) => {
      context.setState({
        myLocation: [position.coords.latitude, position.coords.longitude],
      });
    });
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
              <Button
                onPress={() => this.handleSearchType('me')}
                style={styles.searchTypeButton}
                small
                icon
                transparent
              >
                <Icon active={this.state.searchForMeOrGroup} name="person" />
              </Button>
              <Button
                onPress={() => this.handleSearchType('group')}
                style={styles.searchTypeButton}
                small
                icon
                transparent
              >
                <Icon active={!this.state.searchForMeOrGroup} name="people" />
              </Button>
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <View style={{ position: 'relative', top: -15 }}>
            <Text>SearchForMeOrGroup: {this.state.searchForMeOrGroup ? 'Me' : 'Group'}</Text>
            <Text>My Location: {JSON.stringify(this.state.myLocation)}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}
