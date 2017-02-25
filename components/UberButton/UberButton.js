import React, { Component } from 'react';
import { Linking, Image } from 'react-native';
import { Container, Header, Content, Text, Form, Item, Input, Button } from 'native-base';
import { getUberDeepLink, getUberUniversalLink } from './uberLinks';

const styles = {
  uberButton: {
    width: 220,
    height: 40,
    backgroundColor: 'black',
    position: 'relative',
    top: 20,
    left: 5,
    justifyContent: 'flex-end',
  },
};

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
        <Content>
          <Text>Current: {this.currentLatitude}, {this.currentLongitude}</Text>
          <Text>
            Destination: {this.state.destinationLatitude}, {this.state.destinationLongitude}
          </Text>
          <Form style={{ width: 370 }}>
            <Item>
              <Input
                placeholder={'Destination Latitude'}
                onChangeText={t => this.setState({ destinationLatitude: t })}
              />
            </Item>
            <Item>
              <Input
                placeholder={'Destination Longitude'}
                onChangeText={t => this.setState({ destinationLongitude: t })}
              />
            </Item>
          </Form>
          <Button
            style={styles.uberButton}
            onPress={this.handleClick}
          >
            <Image
              source={require('./uberLogo.png')}
            />
            <Text style={{ color: 'white' }}>Ride There With Uber</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

UberButton.propTypes = {
  user: React.PropTypes.object.isRequired,
};
