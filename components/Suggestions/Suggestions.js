import React, { Component } from 'react';
import { Container, Header, Content, Text } from 'native-base';
import getUserLocation from '../../location/location';
import { categories, getResultsFromKeyword } from '../../google/googlePlaces';
import CategoryButton from './CategoryButton';

export default class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
    };
    getUserLocation().then((location) => {
      this.setState({ location });
    });
  }

  render() {
    return (
      <Container>
        <Header />
        <Content scrollEnabled={false}>
          {categories.map(category => (
            <CategoryButton category={category} key={category} />
          ))}
          <Text>{this.props.groupName}</Text>
          <Text>{JSON.stringify(this.state.location)}</Text>
        </Content>
      </Container>
    );
  }
}

Suggestions.propTypes = {
  groupName: React.PropTypes.string.isRequired,
};
