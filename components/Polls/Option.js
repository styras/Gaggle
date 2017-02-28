import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Body, Text, CheckBox } from 'native-base';

export default class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      votes: this.props.votes,
      checked: false,
    };
    console.log('PROPS', this.props);
  }


  //toggleChecked display
  //call count a vote
  toggleChecked() {
    this.setState({
      checked: !this.state.checked,
    }, () => {
      this.props.handleChecked(this.state.checked);
    });
  }


  // Set so you can click the ListItem OR the CheckBox
  render() {
    return (
      <ListItem onPress={() => this.toggleChecked()}>
        <CheckBox checked={this.state.checked} onPress={() => this.toggleChecked()}/>
        <Body>
          <Text>{this.state.text}</Text>
          <Text>{this.state.votes}</Text>
        </Body>
      </ListItem>
    );
  }
}