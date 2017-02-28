import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Header, Content, Text } from 'native-base';
import { getPlaceDetails } from '../../google/googlePlaces';

const styles = StyleSheet.create({

});

export default class ResultDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {},
    };
    getPlaceDetails(this.props.placeId).then((data) => {
      console.log('Getting result details: ', data.result);
      this.setState({ result: data.result });
    });
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>{JSON.stringify(this.state.result)}</Text>
        </Content>
      </Container>
    );
  }
}

ResultDetails.propTypes = {
  placeId: React.PropTypes.string.isRequired,
};
