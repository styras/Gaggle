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
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
      ]),
      input: '',
      options: [],
    };
    //bind functions to this
  }

  //add a poll option

  //count a vote

  render() {
    return (
      <View style={{flex: 1, paddingTop: 22}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
          <ListItem>
            <Option value={rowData} />
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