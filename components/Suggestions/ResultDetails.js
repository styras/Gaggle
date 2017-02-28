import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text, Icon } from 'native-base';
// import { Grid, Col } from 'react-native-easy-grid';
import moment from 'moment';
import { getPlaceDetails } from '../../google/googlePlaces';
import Stars from './Stars';

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
    const place = this.state.result;

    return (
      <Container>
        <Header />
        <Content>
          <Text>{place.name}</Text>
          <Text>{place.formatted_address}</Text>
          <Text>{place.international_phone_number}</Text>
          {place.website ? <Text>{place.website}</Text> : null}
          <Stars stars={Math.floor(place.rating)} />
          {place.reviews && <Text>Reviews:</Text>}
          {place.reviews ? place.reviews.map(review =>
            <View key={review.author_name}>
              <Text>{review.author_name} ({moment.unix(review.time).fromNow()}) :</Text>
              <Text>{review.rating}</Text>
              <Text>{review.text}</Text>
            </View>,
            ) : null}
        </Content>
      </Container>
    );
  }
}

ResultDetails.propTypes = {
  placeId: React.PropTypes.string.isRequired,
};
