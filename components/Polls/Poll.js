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
    this.removeOption = this.removeOption.bind(this);
  }


  // addOption() {
  //   const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`);
  //   const userID = getCurrentUserId();
  //   optionRef.transaction((options) => {
  //     //console.log('addOption transaction options', options);
  //     //console.log('check child value', this.state.input, optionRef.child(this.state.input));
  //     let optionsArr = options || [];
  //     let unique = true;
  //     if (optionsArr.length) {
  //     optionsArr.forEach((opt) => {
  //         if(opt.text.toLowerCase() === this.state.input.toLowerCase()) {
  //           unique = false;
  //         }
  //       });
  //     }
  //     //console.log('IS UNIQUE', unique, this.state.input, options);
  //     if(unique) {
  //       optionsArr.push({
  //         text: this.state.input,
  //         votes: 0,
  //         responses: {'dummy': 'data'},
  //       });
  //     }
  //     return optionsArr;
  //   }, (error, committed, snapshot) => {
  //     if (error) {
  //       console.log('Transaction failed abnormally!', error);
  //     }
  //     console.log('AddOption Committed: ', committed, 'Option data: ', snapshot.val());
  //   }).then(() => {
  //     this.setState({ input: '' }, () => {
  //       this.getOptions();
  //     });
  //   });
  // }


  addOption() {
    const userID = getCurrentUserId();
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`).push();
    console.log('ID', optionRef.key);
    optionRef.set({
      text: this.state.input,
      votes: 0,
      id: optionRef.key,
      responses: { 'dummy': 'data' },
    }, (error, committed, snapshot) => {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      }
    }).then(() => {
      this.setState({ input: '' }, () => {
        this.getOptions();
      });
    });
  }

  //add or remove votes for an option
  // updateOption(optionObj) {
  //   const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`);
  //   const userID = getCurrentUserId();
  //   //console.log('updateOption', optionObj);
  //   optionRef.transaction((option) => {
  //     if (option) {
  //       //console.log('inside option, option is', option.text, optionObj.text);
  //       option.forEach((opt) => {
  //         if (opt.text === optionObj.text) {
  //           //console.log('opt.text === optionObj.text');
  //           if (opt.responses[userID]) {
  //             opt.responses[userID] = null;
  //           } else {
  //             opt.responses[userID] = true;
  //           }
  //           opt.votes = optionObj.votes;
  //         }
  //       });
  //     } else {
  //       console.log('option is null');
  //     }
  //     return option;
  //   }, (error, committed, snapshot) => {
  //     if (error) {
  //       console.log('Transaction failed abnormally!', error);
  //     }
  //     console.log('UpdateOption Committed: ', committed,'Option data: ', snapshot.val());
  //   });
  // }

  updateOption(optionObj) {
    console.log('UPDATE OPTION', optionObj);
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/${optionObj.id}`);
    const userID = getCurrentUserId();
    optionRef.transaction((opt) => {
      if (opt) {
        //option.forEach((opt) => {
          if (opt.text.toLowerCase() === optionObj.text.toLowerCase()) {
            if (opt.responses[userID]) {
              opt.responses[userID] = null;
            } else {
              opt.responses[userID] = true;
            }
            opt.votes = optionObj.votes;
          }
        //});
      } else {
        console.log('option is null');
      }
      return opt;
    }, (error, committed, snapshot) => {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      }
      console.log('UpdateOption Committed: ', committed,'Option data: ', snapshot.val());
    });
  }


  removeOption(optionObj) {
    console.log('removeOption was triggered', optionObj);
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`);
    optionRef.transaction((options) => {
      let optionsArr = options || [];
      if (optionsArr) {
        console.log('REMOVE OPTION, options', options);
        for(var i=0; i<optionsArr.length; i++) {
          console.log('optionsArr[i].text', optionsArr[i].text);
          if (optionsArr[i].text.toLowerCase() === optionObj.text.toLowerCase()) {
            optionsArr.splice(i, 1);
          }
        }
      } else {
        console.log('option is null');
      }
      return optionsArr;
    }, (error, committed, snapshot) => {
      if (error) {
        console.log('Transaction failed abnormally!', error);
      }
      console.log('RemoveOption Committed: ', committed, 'Option data: ', snapshot.val());
    }).then(() => {
      this.getOptions();
    });
  }


  // get poll options from firebase w/ user votes
  getOptions() {
    // const pollRef = firebaseDB.ref(`/groups/${this.state.group}/polls/`);
    // const id = pollRef.key || 'uid';
    firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`).once('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          options: snapshot.val(),
        }, () => {
          console.log('GetOptions State', this.state.options);
        });
      }
    });
  }


  //get the poll options / results
  componentWillMount() {
    this.getOptions();
  }


  render() {
    console.log('RENDER POLL', this.state.input, this.state.options);
    return (
      <Container>
        <Content>
          <View style={{flex: 1, paddingTop: 22, height: 500}}>
            <ListView
              enableEmptySections
              dataSource={this.ds.cloneWithRows(this.state.options)}
              renderRow={(rowData) =>
                <Option id={rowData.id} text={rowData.text} votes={rowData.votes} responses={rowData.responses} updateOption={this.updateOption} removeOption={this.removeOption} />
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
