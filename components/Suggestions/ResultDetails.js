import React from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Text } from 'native-base';

const ResultDetails = props => (
  <Container>
    <Header />
    <Content>
      <Text>{JSON.stringify(props.details)}</Text>
    </Content>
  </Container>
);

ResultDetails.propTypes = {
  details: React.PropTypes.object.isRequired,
};

export default ResultDetails;
