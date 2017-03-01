import React, { Component } from 'react';
import { Linking, Image } from 'react-native';
import { Button, Text } from 'native-base';
import { getUberDeepLink, getUberUniversalLink } from './uberLinks';
import uberLogo from './uberLogo.png';
import { getUserLocation } from '../../location/locationHelpers';

const styles = {
  uberButton: {
    width: 215,
    height: 40,
    backgroundColor: 'black',
    position: 'relative',
    top: 5,
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
};

export default class UberButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLatitude: 0,
      currentLongitude: 0,
    };

    this._getUserLocation();
    this.handleClick = this.handleClick.bind(this);
  }

  _getUserLocation() {
    getUserLocation().then((position) => {
      this.setState({
        currentLatitude: position[0],
        currentLongitude: position[1],
      });
    });
  }

  handleClick() {
    console.log(this.props);
    const deepLink = getUberDeepLink(
                      this.currentLatitude,
                      this.currentLongitude,
                      this.props.destination[0],
                      this.props.destination[1],
                    );
    const universalLink = getUberUniversalLink(
                            this.currentLatitude,
                            this.currentLongitude,
                            this.props.destination[0],
                            this.props.destination[1],
                          );
    Linking.canOpenURL(deepLink).then((supported) => {
      if (supported) {
        Linking.openURL(deepLink);
      } else {
        Linking.openURL(universalLink);
      }
    });
  }

  render() {
    return (
      <Button
        style={styles.uberButton}
        onPress={this.handleClick}
      >
        <Image
          source={uberLogo}
        />
        <Text style={{ color: 'white' }}>Ride There With Uber</Text>
      </Button>
    );
  }
}

UberButton.propTypes = {
  destination: React.PropTypes.array.isRequired,
};
