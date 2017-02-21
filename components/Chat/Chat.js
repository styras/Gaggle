import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Container, Footer, Content, Icon, Button, ListItem, List, Text } from 'native-base';
import { firebaseDB } from '../../firebase/config.js';
import moment from 'moment';

export default class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
    this.database = firebaseDB;
    this.state = {
      username: this.props.username,
      input: '',
      group: this.props.groupName ? this.props.groupName : 'Default',
      messages: []
    }

    this.messagesRef = this.database.ref('messages/' + this.state.group);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.messagesListener();
  }

  _handleChangePage() {
    this.props.navigator.pop();
  }

  messagesListener() {
    this.messagesRef.on('value', (snapshot) => {
      // Handle no messages created yet...
      if (snapshot.val() === null) {
        this.setState({messages: []});
      } else {
        this.setState({messages: snapshot.val()});
      }
    });
  }

  sendMessage() {
    // Write a message into database
    // Transaction will allow firebase to queue the requests so messages aren't written at the same time
    this.messagesRef.transaction((messages) => {
      if (!messages) {
        messages = [];
      }
      messages.push({
        name: this.state.username,
        message: this.state.input,
        timestamp: new Date().getTime()
      });

      // Clear TextInput
      this.setState({input: ''});

      return messages;
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <List dataArray={this.state.messages} renderRow={(obj) =>
            <ListItem>
              <Text>{obj.name} ({moment(obj.timestamp).fromNow()}): </Text>
              <Text>{obj.message}</Text>
            </ListItem>
          } />
        </Content>
        <Footer style={{position: 'absolute', top: 500}}>
          <TextInput style={styles.textInput}
            value={this.state.input}
            onChangeText={(t) => this.setState({input: t})}
          />
          <View style={{position: 'relative', top: 12}}>
            <Button small onPress={this.sendMessage}>
              <Text style={{color: 'white'}}>Send</Text>
            </Button>
          </View>
          <View style={{paddingRight: 10}}></View>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textInput:{
    flex:1,
    borderColor: 'grey',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10
  }
});
