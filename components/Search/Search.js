import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text, Icon, Item, Input, Button, Spinner } from 'native-base';
import { getGroupMemberLocations, logSearch, firebaseDB } from '../../firebase/firebaseHelpers';
import { getUserLocation, findCentroidFromArray } from '../../location/locationHelpers';
import { getResultsFromKeyword, categories, getPlacePhoto } from '../../google/googlePlaces';
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
      topSearches: [],
      category: null,
      loading: false,
    };

    this.handleSearchType = this.handleSearchType.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.getRandomCategory = this.getRandomCategory.bind(this);
    this.getPhotoProps = this.getPhotoProps.bind(this);

    this.groupsSearches = firebaseDB.ref(`groups/${this.props.groupName}/searches`);

    this.groupsSearches.orderByValue().limitToLast(3).on('value', (snapshot) => {
      const searchesSnapshot = snapshot.val();
      const topThreeSearches = [];

      for (let key in searchesSnapshot) {
        topThreeSearches.push(key);
      }

      this.setState({
        topSearches: topThreeSearches,
      });
    });

  }

  componentWillMount() {
    this._getUserLocation();
    this._getGroupCentroid();
  }

  componentWillUnmount() {
    this.groupsSearches.off();
  }

  getRandomCategory() {
    let randomCategory = categories[Math.floor(Math.random() * categories.length)];
    while (this.state.category === randomCategory) {
      randomCategory = categories[Math.floor(Math.random() * categories.length)];
    }
    this.setState({ category: randomCategory });
    return randomCategory;
  }

  getPhotoProps() {
    const newResults = [];
    this.state.results.forEach((result, index) => {

      console.log('getting photo');
      const photoref = result.photos ? result.photos[0].photo_reference : 'no_photo';
      const newResult = result;
      newResult.order = index;
      // photoURL for results with no photoreference set to "photo not found" image
      if (photoref === 'no_photo') {
        newResult.photoURL = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQuDbG_i4uiHR5rOBuCttQTZ7TU-QBVcsHRu5PtqWeVvLDwRkkQlA';
        newResults.push(newResult);
      } else {
        getPlacePhoto(photoref)
        .then((response) => {
          newResult.photoURL = response;
          newResults.push(newResult);
        });
      }
    });
    setTimeout(() => {
      newResults.sort(function(a, b) {
        return a.order - b.order;
      });
      this.setState({ results: newResults });
    }, 3000);
  }

  handleSearchType(type) {
    if (type === 'me') {
      this.setState({ searchForMeOrGroup: true });
    } else if (type === 'group') {
      this.setState({ searchForMeOrGroup: false });
    }
  }

  handlePopularSearch(searchTerm) {
    const searchLocation = this.state.searchForMeOrGroup ?
                           this.state.myLocation : this.state.groupLocation;
    const radius = this.state.searchForMeOrGroup ? 7500 : 30000;

    logSearch(this.props.groupName, searchTerm);

    this.setState({ loading: true });

    getResultsFromKeyword(searchLocation, searchTerm, radius)
      .then((data) => {
        this.setState({ results: data.results, showInstructions: false, loading: false });
        this.getPhotoProps();
      });
  }

  handleSearch(feelingLucky) {
    const searchLocation = this.state.searchForMeOrGroup ?
                           this.state.myLocation : this.state.groupLocation;
    const searchTerm = feelingLucky ? this.getRandomCategory() : this.state.searchInput;

    const radius = this.state.searchForMeOrGroup ? 7500 : 30000;

    this.setState({ loading: true });

    getResultsFromKeyword(searchLocation, searchTerm, radius)
    .then((data) => {
      this.setState({ results: data.results, showInstructions: false, loading: false });
      this.getPhotoProps();
    });
  }

  _getUserLocation() {
    getUserLocation()
      .then((position) => {
        console.log('Getting location: ', position);
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
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
              }}
            >
              {this.state.topSearches.map((searchValue) => (
                <Button
                  key={searchValue}
                  rounded
                  info
                  small
                  onPress={() => {
                    this.handlePopularSearch(searchValue);
                  }}
                >
                  <Text>{searchValue}</Text>
                </Button>
              ))}
            </View>

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
