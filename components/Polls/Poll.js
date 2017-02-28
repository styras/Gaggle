import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { Container, Content, Body, ListItem, Text, CheckBox } from 'native-base';

import Option from './Option';

export default class Poll extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      username: this.props.user ? this.props.user.displayName : 'Anonymous',
      group: this.props.groupName ? this.props.groupName : 'Default',
      dataSource: ds.cloneWithRows([
        {text: 'John', votes: 9}, {text: 'Joel', votes: 4}, {text: 'James', votes: 1}, {text: 'Jimmy', votes: 3}, {text: 'Jackson', votes: 6}, {text: 'Jillian', votes: 2}, {text: 'Julie', votes: 5}, {text: 'Devin', votes: 3}
      ]),
      input: '',
      options: [],
    };
    //bind functions to this
  }

  //add a poll option

  //toggleChecked display
    //call count a vote
  toggleChecked() {
    console.log('check toggled');
  }

  //count a vote

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
          <ListItem>
            <Option text={rowData.text} votes={rowData.votes} />
          </ListItem>
        }
        />
      </View>
    );
  }
}

Poll.propTypes = {
  user: React.PropTypes.object.isRequired,
  groupName: React.PropTypes.string.isRequired,
};