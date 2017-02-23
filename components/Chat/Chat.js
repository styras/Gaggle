import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ListView } from 'react-native';
import { Button, ListItem, Text } from 'native-base';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import moment from 'moment';
import { firebaseDB } from '../../firebase/firebaseHelpers';

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10,
  },
  chatInput: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
});

export default class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
    this.database = firebaseDB;
    this.state = {
      username: this.props.user ? this.props.user.displayName : 'Anonymous',
      input: '',
      group: this.props.groupName ? this.props.groupName : 'Default',
      messages: [],
    };

    this._ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._chatList = {};
    this.messagesRef = this.database.ref(`messages/${this.state.group}`);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.messagesListener();
  }

  componentDidUpdate() {
    this._chatList.scrollTo({ y: 0 });
  }

  _handleChangePage() {
    this.props.navigator.pop();
  }

  messagesListener() {
    this.messagesRef.on('value', (snapshot) => {
      // Handle no messages created yet...
      if (snapshot.val() === null) {
        this.setState({ messages: [] });
      } else {
        this.setState({ messages: snapshot.val().reverse() });
      }
    });
  }

  sendMessage() {
    // Write a message into database
    // Transaction will allow firebase to queue the requests
    // so messages aren't written at the same time
    this.messagesRef.transaction((messages) => {
      const groupMessages = messages || [];

      groupMessages.push({
        name: this.state.username,
        message: this.state.input,
        timestamp: new Date().getTime(),
      });

      // Clear TextInput
      this.setState({ input: '' });

      return groupMessages;
    });
  }

  render() {
    return (
      <View>
        <View style={{ height: 500 }}>
          <Text>{JSON.stringify(this.props.user)}</Text>
          <ListView
            enableEmptySections
            renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
            ref={(chatList) => { this._chatList = chatList; }}
            dataSource={this._ds.cloneWithRows(this.state.messages)}
            renderRow={obj =>
              <ListItem>
                <Text style={{ fontSize: 13 }}>
                  {obj.name} ({moment(obj.timestamp).fromNow()}): {obj.message}
                </Text>
              </ListItem>
            }
          />
        </View>
        <View style={styles.chatInput}>
          <View style={{ flex: 4, height: 50 }}>
            <TextInput
              style={styles.textInput}
              value={this.state.input}
              onChangeText={t => this.setState({ input: t })}
            />
          </View>
          <View style={{ flex: 1, marginTop: 10 }}>
            <Button small onPress={this.sendMessage}>
              <Text style={{ color: 'white' }}>Send</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

Chat.propTypes = {
  user: React.PropTypes.object.isRequired,
  groupName: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
};
