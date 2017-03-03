import React, { Component } from 'react';
import { ListView, View, TextInput, ScrollView } from 'react-native';
import { Container, Content, Text, Button } from 'native-base';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
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


  addOption() {
    //console.log('addOption text', this.state.input);
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`);
    const userID = getCurrentUserId();
    optionRef.transaction((options) => {
      //console.log('addOption transaction options', options);
      //console.log('check child value', this.state.input, optionRef.child(this.state.input));
      let optionsArr = options || [];
      let unique = true;
      optionsArr.forEach((opt) => {
        //console.log('IS UNIQUE', opt.text == this.state.input, opt.text, this.state.input);
        if(opt.text == this.state.input) {
          unique = false;
        }
      });
      //console.log('IS UNIQUE', unique, this.state.input, options);
      if(unique) {
        optionsArr.push({
          text: this.state.input,
          votes: 0,
          responses: {'dummy': 'data'},
        });
      }
      return optionsArr;
    }, (error, committed, snapshot) => {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because option already exists).');
      } else {
        console.log('Option added!');
      }
      console.log('Option data: ', snapshot.val());
    }).then(() => {
      this.setState({ input: '' }, () => {
        this.getOptions();
      });
    });
  }

  //add or remove votes for an option
  updateOption(optionObj) {
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`);
    const userID = getCurrentUserId();
    //console.log('updateOption', optionObj);
    optionRef.transaction((option) => {
      if (option) {
        //console.log('inside option, option is', option.text, optionObj.text);
        option.forEach((opt) => {
          if (opt.text === optionObj.text) {
            //console.log('opt.text === optionObj.text');
            if (opt.responses[userID]) {
              opt.responses[userID] = null;
            } else {
              opt.responses[userID] = true;
            }
            opt.votes = optionObj.votes;
          }
        });
      } else {
        console.log('option is null');
      }
      return option;
    }, (error, committed, snapshot) => {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      } else if (!committed) {
        console.log('We aborted the transaction (because option already exists).');
      } else {
        console.log('Option updated!');
      }
      console.log('Option data: ', snapshot.val());
    });
  }


  // get poll options from firebase w/ user votes
  getOptions() {
    // const pollRef = firebaseDB.ref(`/groups/${this.state.group}/polls/`);
    // const key = pollRef.key || 'uid';
    firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`).orderByValue().once('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          options: snapshot.val(),
        }, () => {
          //console.log('downloaded options', this.state.options);
        });
      } else {
        const pollRef = firebaseDB.ref(`/groups/${this.state.group}/polls/`).push();
        const key = pollRef.key;
        console.log('getOptions key', key);
      }
    });
  }


  //get the poll options / results
  componentWillMount() {
    this.getOptions();
  }

  //submit the poll for a user
  componentWillUnmount() {
    //firebaseDb.off();
  }


  render() {
    //console.log('STATE', this.state.input, this.state.options);
    return (
      <Container>
        <Content>

          <View style={{flex: 1, paddingTop: 22, height: 500}}>
            <ListView
              enableEmptySections
              dataSource={this.ds.cloneWithRows(this.state.options)}
              renderRow={(rowData) =>
                <Option text={rowData.text} votes={rowData.votes} responses={rowData.responses} updateOption={this.updateOption} />
              }
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: 'lightgrey',
            }}>
            <View style={{ flex: 3, height: 50 }}>
              <TextInput
                style={{
                  flexGrow: 1,
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
              <Button small onPress={this.addOption} disabled={this.state.input.length < 1}>
                <Text style={{ color: 'white' }}>Add</Text>
              </Button>
            </View>
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