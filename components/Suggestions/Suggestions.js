import React, { Component } from 'react';
import { Container, Header, Content, Text } from 'native-base';
import getUserLocation from '../../location/location';
import GOOGLE_API_KEY from '../../google/config';

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
          <Text>{GOOGLE_API_KEY}</Text>
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
