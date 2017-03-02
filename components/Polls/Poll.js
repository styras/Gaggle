import React, { Component } from 'react';
import { ListView, View, TextInput } from 'react-native';
import { Container, Content, Text, Button } from 'native-base';
import { firebaseDB, getCurrentUserId } from '../../firebase/firebaseHelpers';

import Option from './Option';

export default class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user ? this.props.user.displayName : 'Anonymous',
      group: this.props.groupName ? this.props.groupName : 'Default',
      input: '',
      options: [],
    };
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.addOption = this.addOption.bind(this);
    this.updateOption = this.updateOption.bind(this);
  }

  //add a poll option
  addOption() {
    console.log('addOption text', this.state.input);
    const optionState = {"text": this.state.input, "votes": 0};
    if(this.state.input != '') {
      firebaseDB.ref(`/groups/${this.state.group}/polls/options/`).push().set(optionState)
      .then(() => {
        this.setState({
          input: ''
        }, () => {
          this.getOptions();
        });
      });
    }
  }


  // addOption() {
  //   console.log('addOption text', this.state.input);
  //   const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/options/`);
  //   const uid = getCurrentUserId();
  //   optionRef.transaction((option) => {
  //     optionRef.push({
  //       text: this.state.input,
  //       votes: 1,
  //       responses: responses[uid] = true,
  //     });
  //     return option;
  //   }, (error, committed, snapshot) => {
  //     if (error) {
  //       console.log('Transaction failed abnormally!', error);
  //     } else if (!committed) {
  //       console.log('We aborted the transaction (because option already exists).');
  //     } else {
  //       console.log('Option added!');
  //     }
  //     console.log('Option data: ', snapshot.val());
  //   });
  // }


  // sendMessage() {
  //   this.messagesRef.transaction((messages) => {
  //     const groupMessages = messages || [];
  //     groupMessages.push({
  //       name: this.state.username,
  //       message: this.state.input,
  //       timestamp: new Date().getTime(),
  //     });
  //     this.setState({ input: '' });
  //     return groupMessages;
  //   });
  // }


  //add or remove votes for an option

  updateOption(option) {
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/options/`);
    const uid = getCurrentUserId();
    console.log('updateOption', option, 'UID', uid);
    optionRef.transaction((option) => {
      if (option) {
        if (option.text && option.responses[uid]) {
          //option.votes--;
          //option.responses[uid] = null;
        } else {
          //option.votes++;
          if (option.votes === 0) {
            //option.responses = {};
          }
          //option.responses[uid] = true;

        }
      }
      return option;
    }, (error, committed, snapshot) => {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because option already exists).');
      } else {
        console.log('Option added!');
      }
      console.log('Option data: ', snapshot.val());
    });
  }

  // get poll options from firebase w/ user votes
  getOptions() {
    firebaseDB.ref(`/groups/${this.state.group}/polls/options/`).once('value', (snapshot) => {
      this.setState({
        options: snapshot.val()
      }, () => {
        //console.log('downloaded options', this.state.options);
      });
    });
  }

  //get the poll options / results
  componentWillMount() {
    this.getOptions();
  }

  //submit the poll for a user
  componentWillUnmount() {
    firebaseDb.off();
  }


  render() {
    console.log('STATE', this.state.input, this.state.options);
    return (
      <Container>
        <Content>
          <View style={{flex: 1, paddingTop: 22}}>
            <ListView
              dataSource={this.ds.cloneWithRows(this.state.options)}
              renderRow={(rowData) =>
                <Option text={rowData.text} votes={rowData.votes} updateOption={this.updateOption} />
              }
            />
          </View>
          <View style={{ flex: 3, height: 50 }}>
            <TextInput
              style={{
                flex: 1,
                borderColor: 'grey',
                borderWidth: 1,
                paddingLeft: 10,
                margin: 10,
              }}
              value={this.state.input}
              onChangeText={(t) => this.setState({ input: t })}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
            }}>
            <Button small onPress={this.addOption}>
              <Text style={{ color: 'white' }}>Add</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

Poll.propTypes = {
  user: React.PropTypes.object.isRequired,
  groupName: React.PropTypes.string.isRequired,
};