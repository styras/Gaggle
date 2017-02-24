import React, { Component } from 'react';
import { Linking } from 'react-native';
import { Container, Header, Text, Button, Input } from 'native-base';
import { getUberDeepLink, getUberUniversalLink } from './uberLinks';

export default class UberButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      destinationLatitude: 0,
      destinationLongitude: 0,
    };
    this.currentLatitude = this.props.user.location.coords.latitude;
    this.currentLongitude = this.props.user.location.coords.longitude;
  }

  handleClick() {
    const deepLink = getUberDeepLink(
                      this.currentLatitude,
                      this.currentLongitude,
                      this.state.destinationLatitude,
                      this.state.destinationLongitude,
                    );
    const universalLink = getUberUniversalLink(
                            this.currentLatitude,
                            this.currentLongitude,
                            this.state.destinationLatitude,
                            this.state.destinationLongitude,
                          );
    Linking.canOpenURL(deepLink).then((supported) => {
      if (supported) {
        console.log('openURL:', deepLink);
        Linking.openURL(deepLink);
      } else {
        console.log('openURL:', universalLink);
        Linking.openURL(universalLink);
      }
    });
  }

  render() {
    return (
      <Container>
        <Header />
        <Text>Current: {this.currentLatitude}, {this.currentLongitude}</Text>
        <Text>
          Destination: {this.state.destinationLatitude}, {this.state.destinationLongitude}
        </Text>
        <Button onPress={this.handleClick}><Text>UberButton</Text></Button>
      </Container>
    );
  }
}

UberButton.propTypes = {
  user: React.PropTypes.object.isRequired,
};
