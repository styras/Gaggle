import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text, Icon, Item, Input, Button, Spinner } from 'native-base';
import { getGroupMemberLocations } from '../../firebase/firebaseHelpers';
import { getUserLocation, findCentroidFromArray } from '../../location/locationHelpers';
import { getResultsFromKeyword, categories } from '../../google/googlePlaces';
import Results from '../Search/Results';
import CategoryButton from '../Search/CategoryButton';

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
      showInstructions: true,
      myLocation: [],
      groupLocation: [],
      results: [],
      category: null,
      loading: false,
    };

    this._getUserLocation();
    this._getGroupCentroid();

    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getRandomCategory = this.getRandomCategory.bind(this);
  }

  getRandomCategory() {
    let randomCategory = categories[Math.floor(Math.random() * categories.length)];
    while (this.state.category === randomCategory) {
      randomCategory = categories[Math.floor(Math.random() * categories.length)];
    }
    this.setState({ category: randomCategory });
    return randomCategory;
  }

  handleSearch(feelingLucky) {
    const searchLocation = this.state.searchForMeOrGroup ?
                           this.state.myLocation : this.state.groupLocation;
    const searchTerm = feelingLucky ? this.getRandomCategory() : this.state.searchInput;

    this.setState({ loading: true });

    getResultsFromKeyword(searchLocation, searchTerm, 7500)
      .then((data) => {
        this.setState({ results: data.results, showInstructions: false, loading: false });
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
    getUserLocation()
      .then((position) => {
        this.setState({ myLocation: [position[0], position[1]] });
      });
  }

  _getGroupCentroid() {
    getGroupMemberLocations(this.props.groupName)
      .then(locations => this.setState({ groupLocation: findCentroidFromArray(locations) }));
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
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
            <Button onPress={() => this.handleSearch(false)} transparent>
              <Text>Search</Text>
            </Button>
          </Header>

          <View style={{ position: 'relative', top: -15 }}>
            <CategoryButton
              category={'I\'m Feeling Lucky' + (this.state.category ? `: ${this.state.category}` : '')}
              getSuggestions={() => this.handleSearch(true)}
            />

            {this.state.showInstructions &&
            <View style={{ margin: 10, marginTop: 5 }}>
              <Text>{'Search around your location or your group\'s!'}</Text>
            </View>}

            {this.state.loading && <Spinner />}

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
