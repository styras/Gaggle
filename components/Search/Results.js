import React, { Component } from 'react';
import { Image } from 'react-native';
import { List, ListItem, Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
import ResultDetails from './ResultDetails';
import { getUserLocation, findDistanceBetweenCoords } from '../../location/locationHelpers';
import { getPlacePhoto } from '../../google/googlePlaces';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLocation: [],
    };

    this._getUserLocation();
    this._getTestPhoto();

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

  _getTestPhoto() {
    var context = this;
    getPlacePhoto('CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU')
    .then(function(photo) {
      context.setState( {testPhoto: photo.url} );
      console.log('testPhoto is', context.state.testPhoto);
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
              <Col size={1.5}>
                <Image
                  source={{ uri: result.photoURL }}
                  style={{ width: 75, height: 50, resizeMode: 'contain' }}
                />
              </Col>
              <Col size={4}>
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
