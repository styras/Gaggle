import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ListView, Image, Linking, Dimensions } from 'react-native';
import { Button, ListItem, Text, Icon } from 'native-base';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import Autolink from 'react-native-autolink';
import { firebaseDB } from '../../firebase/firebaseHelpers';

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    paddingTop: 2,
    paddingLeft: 5,
    margin: 10,
  },
  chatInput: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'lightgrey',
  },
  sendMessage: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  giphy: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
    marginTop: 5,
  },
});

const nativeBaseStyles = {
  messageAuthor: {
    fontWeight: '600',
    fontSize: 13,
  },
};

export default class Chat extends Component {
  constructor(props, context) {
    super(props, context);
    this.database = firebaseDB;
    this.state = {
      username: this.props.user ? this.props.user.displayName : 'Anonymous',
      input: '',
      group: this.props.groupName ? this.props.groupName : 'Default',
      messages: [],
      image: 'https://cdn.brainpop.com/science/ecologyandbehavior/foodchains/icon.png',
    };

    this.height = Dimensions.get('window').height;
    this.width = Dimensions.get('window').width;
    this._ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this._chatList = {};
    this.messagesRef = this.database.ref(`messages/${this.state.group}`);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.messagesListener();
    //Linking.addEventListener('url', this._handleOpenURL);
  }

  componentDidUpdate() {
    this._chatList.scrollTo({ y: 0 });
  }

  componentWillUnmount() {
    this.messagesRef.off('value');
    //Linking.removeEventListener('url', this._handleOpenURL);
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

  _handleOpenURL(url) {
    //console.log('handleOpenURL', url);
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }

  selectImage() {
    const options = {
      quality: 1.0,
      maxWidth: 375,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          image: source
        });
      }
    });
  }

  render() {
    return (
      <View>
        <View style={{ height: this.height - 166, marginLeft: -15 }}>
          <ListView
            enableEmptySections
            renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
            ref={(chatList) => { this._chatList = chatList; }}
            dataSource={this._ds.cloneWithRows(this.state.messages)}
            renderRow={obj =>
              <ListItem>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={nativeBaseStyles.messageAuthor}>
                      {obj.name} ({moment(obj.timestamp).fromNow()}):
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Autolink text={obj.message} />
                  </View>

                  {obj.message.toLowerCase().indexOf('https://media.giphy.com/') > -1 &&
                  <Image
                    style={styles.giphy}
                    source={{ uri: obj.message }}
                  />}

                </View>
              </ListItem>
            }
          />
        </View>
        <View style={styles.chatInput}>
          <View style={{ flex: 3, height: 50 }}>
            <TextInput
              style={styles.textInput}
              value={this.state.input}
              onChangeText={t => this.setState({ input: t })}
            />
          </View>
          <View style={{ justifyContent: 'space-around', alignItems: 'center' }}>
            <Icon
              name={'camera'}
              onPress={this.selectImage}
              style={{
                fontSize: 40,
                marginTop: 3,
              }}
            />
          </View>
          <View style={styles.sendMessage}>
            <Button small onPress={this.sendMessage} disabled={this.state.input.length < 1}>
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
};
