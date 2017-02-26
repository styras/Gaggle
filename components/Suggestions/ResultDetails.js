import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Text } from 'native-base';

const ResultDetails = props => (
  <Container>
    <Header />
    <Content>
      <Image source={props.icon} />
      <Text>Name: {props.details.name}</Text>
      <Text>Lat/Lng: [{props.details.geometry.location.lat}, {props.details.geometry.location.lng}</Text>
      <Text>Rating: {props.details.rating}</Text>
      <Text>Address: {props.details.vicinity}</Text>
      <Text>Open Now?
        { props.details.opening_hours && props.details.opening_hours.open_now ? ' Yep!' : ' No :('
        }
      </Text>
      <Text>
        Types: {props.details.types.join(', ')}
      </Text>
    </Content>
  </Container>
);

ResultDetails.propTypes = {
  details: React.PropTypes.object.isRequired,
};

export default ResultDetails;
