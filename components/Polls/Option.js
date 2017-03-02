import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Body, Text, CheckBox } from 'native-base';

export default class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      votes: this.props.votes,
      uid: this.props.uid,
      checked: false,
    };
    //console.log('PROPS', this.props);
  }


  //toggleChecked display
  //call count a vote
  toggleChecked() {
    console.log('COUNT BEFORE', this.state.checked, this.state.votes);
    this.setState({
      checked: !this.state.checked,
    }, () => {
      if (this.state.checked) {
        this.setState({
          votes: this.state.votes + 1,
        }, () => {
          //console.log('UPDATED COUNT', this.state.checked, this.state.votes);
          this.props.updateOption({ text: this.state.text, votes: this.state.votes, uid: this.state.uid });
        });
      } else {
        this.setState({
          votes: this.state.votes - 1,
        }, () => {
          //console.log('UPDATED COUNT', this.state.checked, this.state.votes);
          this.props.updateOption({ text: this.state.text, votes: this.state.votes, uid: this.state.uid });
        });
      }
    });
  }


  // Set so you can click the ListItem OR the CheckBox
  render() {
    return (
      <ListItem onPress={() => this.toggleChecked()}>
        <CheckBox checked={this.state.checked} onPress={() => this.toggleChecked()} />
        <Body>
          <Text>{this.state.text}</Text>
          <Text>{this.state.votes}</Text>
        </Body>
      </ListItem>
    );
  }
}