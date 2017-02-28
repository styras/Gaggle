import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text } from 'native-base';
// import { Grid, Col } from 'react-native-easy-grid';
import Autolink from 'react-native-autolink';
import moment from 'moment';
import { getPlaceDetails } from '../../google/googlePlaces';
import Stars from './Stars';
import Minimap from './Minimap';

export default class ResultDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {},
      placeLocation: [0, 0],
    };

    getPlaceDetails(this.props.placeId).then((data) => {
      console.log('Getting result details: ', data.result);
      const place = data.result;
      this.setState({
        place,
        placeLocation: [place.geometry.location.lat, place.geometry.location.lng],
      });
    });
  }

  render() {
    const place = this.state.place;

    return (
      <Container>
        <Header />
        <Content>
          <Minimap coords={this.state.placeLocation} placeName={place.name || 'Waiting for place name...'} />
          <Text>{place.name}</Text>
          <Text>{place.formatted_address}</Text>
          {place.international_phone_number ?
            <Autolink text={place.international_phone_number} /> : null}
          {place.website ? <Autolink text={place.website} /> : null}
          {place.opening_hours && <Text>Open Now: {place.opening_hours.open_now ? 'Yes' : 'No'}</Text>}
          <Stars stars={Math.floor(place.rating)} />
          {place.reviews && <Text>Reviews:</Text>}
          {place.reviews ? place.reviews.map(review =>
            <View key={review.author_name}>
              <Text>{review.author_name} ({moment.unix(review.time).fromNow()}) :</Text>
              <Stars stars={Math.floor(review.rating)} />
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
