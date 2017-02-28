import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text, Icon, Item, Input, Button } from 'native-base';
import Results from '../Suggestions/Results';
import { getGroupMemberLocations } from '../../firebase/firebaseHelpers';
import { findCentroidFromArray } from '../../location/locationHelpers';
import { getResultsFromKeyword } from '../../google/googlePlaces';

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
      groupLocation: [],
      results: [],
    };

    this._getUserLocation();
    getGroupMemberLocations(this.props.groupName)
      .then(locations => this.setState({ groupLocation: findCentroidFromArray(locations) }));

    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    const searchLocation = this.state.searchForMeOrGroup ?
                           this.state.myLocation : this.state.groupLocation;
    getResultsFromKeyword(searchLocation, this.state.searchInput, 7500)
    .then((data) => {
      this.setState({ results: data.results, searchInput: '' });
    });
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
              <Input
                placeholder="Search"
                value={this.state.searchInput}
                onChangeText={t => this.setState({ searchInput: t })}
                onFocus={() => this.setState({ searchInput: '' })}
              />
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
            <Button onPress={this.handleSearch} transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <View style={{ position: 'relative', top: -15 }}>
            <Text>SearchForMeOrGroup: {this.state.searchForMeOrGroup ? 'Me' : 'Group'}</Text>
            <Text>My Location: {JSON.stringify(this.state.myLocation)}</Text>
            <Text>Group Centroid: {JSON.stringify(this.state.groupLocation)}</Text>
            <Text>Search Input: {this.state.searchInput}</Text>
            <Text>Group Name: {this.props.groupName}</Text>
            <Results navigator={this.props.navigator} results={this.state.results} />
          </View>
        </Content>
      </Container>
    );
  }
}

Search.propTypes = {
  groupName: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
};
