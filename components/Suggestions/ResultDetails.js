import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, Text, Card, CardItem, Body } from 'native-base';
import Autolink from 'react-native-autolink';
import moment from 'moment';
import { getPlaceDetails } from '../../google/googlePlaces';
import Stars from './Stars';
import Minimap from './Minimap';
import UberButton from '../UberButton/UberButton';

const styles = {
  title: {
    fontSize: 24,
  },
  link: {
    fontSize: 15,
  },
  cardHeader: {
    paddingBottom: 0,
  },
  cardItem: {
    paddingTop: 0,
  },
  reviewCard: {
    padding: 10,
  },
  review: {
    marginBottom: 15,
  },
  reviewAuthor: {
    fontWeight: '500',
  },
};

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

  getAddressLink(locationArray) {
    return `http://maps.apple.com/?ll=${locationArray[0]},${locationArray[1]}`;
  }

  render() {
    const place = this.state.place;

    return (
      <Container>
        <Header />
        <Content>
          <Minimap coords={this.state.placeLocation} placeName={place.name || 'Waiting for place name...'} />
          <Card>
            <CardItem style={styles.cardHeader} header>
              <Text style={styles.title}>{place.name}</Text>
            </CardItem>

            <View style={{ marginLeft: 13 }} >
              <Stars stars={Math.floor(place.rating)} />
            </View>

            <CardItem>
              <Body>
                {place.formatted_address &&
                <View>
                  <Text>{place.formatted_address.slice(0, place.formatted_address.indexOf(', '))}</Text>
                  <Text>{place.formatted_address.slice(place.formatted_address.indexOf(', ') + 2)}</Text>
                </View>}
                {place.international_phone_number ?
                  <Autolink style={styles.link} text={place.international_phone_number} />
                  : null}
              </Body>
            </CardItem>
            <CardItem style={styles.cardItem}>
              {place.opening_hours &&
              <Text>Open Now: {place.opening_hours.open_now ? 'Yes' : 'No'}</Text>}
            </CardItem>
            {place.website &&
              <CardItem style={styles.cardItem}>
                <Text>Website: </Text>
                <Autolink style={styles.link} text={place.website} />
              </CardItem>}
            <CardItem style={styles.cardItem}>
              <Text>Open in Maps: </Text>
              {this.state.placeLocation ?
                <Autolink style={{}} text={this.getAddressLink(this.state.placeLocation)} />
                : null }
            </CardItem>
            <CardItem style={styles.cardItem}>
              <UberButton destination={this.state.placeLocation} />
            </CardItem>
          </Card>
          {place.reviews ?
            <Card style={styles.reviewCard}>
              {place.reviews.map(review =>
                <View key={review.author_name} style={styles.review}>
                  <Text style={styles.reviewAuthor}>
                    {review.author_name} ({moment.unix(review.time).fromNow()}) :
                  </Text>
                  <Stars stars={Math.floor(review.rating)} />
                  <Text>{review.text}</Text>
                </View>,
                )}
            </Card>
          : null}
        </Content>
      </Container>
    );
  }
}

ResultDetails.propTypes = {
  placeId: React.PropTypes.string.isRequired,
};
