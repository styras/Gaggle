import React, { Component } from 'react';
import { List, ListItem, Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import ResultDetails from './ResultDetails';
import { getUserLocation, findDistanceBetweenCoords } from '../../location/locationHelpers';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: [],
    };

    this._getUserLocation();
    this.goToResultDetails = this.goToResultDetails.bind(this);
  }

  goToResultDetails(details) {
    this.props.navigator.push({
      component: ResultDetails,
      title: details.name,
      passProps: { placeId: details.place_id },
    });
  }

  _getUserLocation() {
    getUserLocation().then((position) => {
      this.setState({ myLocation: [position[0], position[1]] });
    });
  }

  render() {
    return (
      <List>
        {this.props.results.map(result => (
          <ListItem
            key={result.id}
            onPress={() => this.goToResultDetails(result)}
          >
            <Grid>
              <Col size={5}>
                <Text>{result.name}</Text>
              </Col>
              <Col size={1}>
                <Text>
                  {findDistanceBetweenCoords(
                      this.state.myLocation,
                      [result.geometry.location.lat, result.geometry.location.lng],
                    ).toFixed(2)} mi
                </Text>
              </Col>
            </Grid>
          </ListItem>
        ))}
      </List>
    );
  }
}

Results.propTypes = {
  results: React.PropTypes.array.isRequired,
  navigator: React.PropTypes.object.isRequired,
};
