import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, CheckBox } from 'native-base';

export default class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      votes: 0,
    }
  }

  render() {
    return (
      <View>
        <CheckBox />
        <Text>Sample Option</Text>
      </View>
    );
  }
}