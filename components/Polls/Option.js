import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Button, CheckBox } from 'native-base';

export default class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      votes: this.props.votes,
    }
  }

  render() {
    return (
      <View>
        <CheckBox checked={false} onPress={() => this.props.toggleChecked()} />
        <Text>{this.state.text}</Text>
        <Text>{this.state.votes}</Text>
      </View>
    );
  }
}