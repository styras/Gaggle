import React, { Component } from 'react';
import { View, Dimensions, Alert, TouchableHighlight, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Fab, Icon } from 'native-base';
// import Sound from 'react-native-sound';
import { firebaseDB, updateUserLocation } from '../../firebase/firebaseHelpers';
import { getUserLocation } from '../../location/locationHelpers';
import duckYellow from '../../images/duck_emoji_smaller.png';
import duckBlue from '../../images/duck_emoji_smaller_blue.png';
import duckGreen from '../../images/duck_emoji_smaller_green.png';
import duckPurple from '../../images/duck_emoji_smaller_purple.png';
import duckRed from '../../images/duck_emoji_smaller_red.png';
import Search from '../Search/Search';
import styles from './MapStyles';

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currLoc: '',
      markersArray: [],
      user: props.user,
      chirping: props.chirping,
      userLocation: props.userLocation,
    };

    this.goToSearch = this.goToSearch.bind(this);
    this.playChirp = this.playChirp.bind(this);
    this.chirp = this.chirp.bind(this);
  }

  componentWillMount() {
    this.getMemberLocations(this.props.groupName);
    getUserLocation().then((response) => {
      this.setState({
        currLoc: response,
      });
    });
  }

  componentDidMount() {
    const map = this.refs.mymap;
    const context = this;

    this._fitToSuppliedMarkers = function() {
      if (this.state.chirping === true) {
        const map = this.refs.mymap;
        console.log('chirp received');
        console.log(this.props.userLocation);
        map.animateToCoordinate({latitude: 0, longitude: 0}, 2);
        // map.animateToCoordinate((this.props.userLocation), 2);

      } else {
        setTimeout(() => {
        const markers = context.state.markersArray.map(marker => marker.displayName);
        map.fitToSuppliedMarkers(markers, true);
        }, 2500)
      }
      this.setState({chirping: false});
    };

    this._updateUserLocation = setInterval(() => {
      updateUserLocation(this.props.groupName);
    }, 15000);

    this._updateMemberLocations = setInterval(() => {
      this.getMemberLocations(this.props.groupName);
    }, 10000);

    if (this.state.chirping === true) {
      const map = this.refs.mymap;
      console.log('chirp received');
      console.log(this.props.userLocation);
      map.animateToCoordinate({latitude: 0, longitude: 0}, 2);
      // map.animateToCoordinate((this.props.userLocation), 2);
      this.setState({chirping: false});
    }
  }

  componentWillUnmount() {
    clearInterval(this._updateUserLocation);
    clearInterval(this._updateMemberLocations);
    clearTimeout(this._fitToSuppliedMarkers);
  }

  getMemberLocations(activeGroup) {
    const markersArray = [];
    firebaseDB.ref(`groups/${activeGroup}/members/`).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        // if a member is chirping, call chirp function
        if (childSnapshot.val().chirp === true) {
          this.playChirp(childSnapshot.val().displayName, childSnapshot.val().location.coords);
        }
        markersArray.push({ coordinate: {
          latitude: childSnapshot.val().location.coords.latitude,
          longitude: childSnapshot.val().location.coords.longitude,
        },
          displayName: childSnapshot.val().displayName,
        });
      });
      this.setState({ markersArray });
    });
  }

  goToSearch() {
    this.props.navigator.push({
      component: Search,
      title: 'Explore',
      passProps: {
        groupName: this.props.groupName,
      },
    });
  }

  chirp() {
    // get user id
    const userId = this.state.user.uid;
    const activeGroup = this.props.groupName;
    // update user property in the dB
    const member = firebaseDB.ref(`groups/${activeGroup}/members/${userId}`);
    member.update({
      chirp: true,
    })
    .catch((error) => { console.log(`error ${error}`); });

    // wait 10 seconds (interval for other group members to check locations)
    setTimeout(() => {
      member.update({
        chirp: false,
      })
      .catch((error) => { console.log(`error ${error}`); });
    }, 10000);
  }

  goToUser(memberName, userLocation) {
    this.props.navigator.push({
      component: MapDisplay,
      passProps: {
        userName: memberName,
        userLocation: (userLocation),
        chirping: true,
        groupName: this.props.groupName,
      }
    })
  }

  playChirp(memberName, userLocation) {
 //   if (memberName != this.state.user.displayName) {
      Alert.alert(
      'Chirp!',
      `${memberName} is chirping!`,
      [
        { text: `Go to ${memberName}`,
          onPress: this.goToUser(memberName, userLocation),
        },
        { text: 'Dismiss' },
      ],
    );
//    } else {
//      Alert.alert('Chirp successful!')
//    };
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const emojis = [duckYellow, duckBlue, duckGreen, duckPurple, duckRed];

    return (
      <View>
        <MapView
          ref="mymap"
          style={{ width, height: height - 114 }}
          initialRegion={{
            latitude: this.state.currLoc ? this.state.currLoc[0] : 50,
            longitude: this.state.currLoc ? this.state.currLoc[1] : -135,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation
        >
          {this.state.markersArray.map((marker, i) => (
            <MapView.Marker
              key={i}
              title={marker.displayName}
              identifier={marker.displayName}
              coordinate={{ latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude }}
              image={emojis[(5 + i) % 5]}
            />
          ),
          )
        }
          <TouchableHighlight
            style={styles.addButton}
            underlayColor='#ff9900' onPress={this.chirp}
          >
            <Text style={{ fontSize: 14, color: 'white' }}>Chirp</Text>
          </TouchableHighlight>
        </MapView>
        <Fab
          position={'bottomRight'}
          style={{ backgroundColor: '#0066cc' }}
          onPress={this.goToSearch}
        >
          <Icon name={'search'} />
        </Fab>
      </View>
    );
  }
}


MapDisplay.propTypes = {
  groupName: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
};
