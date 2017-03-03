import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, Body, Text, CheckBox } from 'native-base';
import { getCurrentUserId } from '../../firebase/firebaseHelpers';

export default class Option extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      votes: this.props.votes,
      responses: this.props.responses,
      checked: this.props.responses[getCurrentUserId()] || false,
    };

    const userID = getCurrentUserId();
    console.log('OPTION STATE', this.state);
    console.log('RESPONSES', this.props.responses[userID]);
  }


  //toggleChecked display
  toggleChecked() {
    //console.log('COUNT BEFORE', this.state.checked, this.state.votes);
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
          <Text
            style={{
              flex: 3,
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontSize: 13
            }}>
            {this.state.text}
          </Text>
          <Text
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              fontSize: 20,
              fontWeight: '600'
            }}>
            {this.state.votes}
          </Text>
        </Body>
      </ListItem>
    );
  }
}