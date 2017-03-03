import React, { Component } from 'react';
import { Button, Text, View } from 'native-base';
import { retrieveTopThree } from '../../firebase/firebaseHelpers';

export default class MostSearched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topSearches: [],
    };
  }

  componentWillMount() {
    retrieveTopThree(this.props.groupName);
  }

  render() {
    return (
      <View>
        {this.state.topSearches.map((search, i) => (
          <Button
            key={i}
            rounded
            info
            onPress={() => console.log('Hello!')}
          >
            <Text>{search}</Text>
          </Button>
        ))}
      </View>
    );
  }
}

MostSearched.propTypes = {
  groupName: React.PropTypes.string.isRequired,
  handleSearch: React.PropTypes.func.isRequired,
};
