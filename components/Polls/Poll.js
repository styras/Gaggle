import React, { Component } from 'react';
import { ListView, View, TextInput } from 'react-native';
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


  addOption() {
    const userID = getCurrentUserId();
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`).push();
    //console.log('ID', optionRef.key);
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
      this.setState({
        input: '',
      });
    });
  }

  updateOption(optionObj) {
    //console.log('UPDATE OPTION', optionObj);
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/${optionObj.id}`);
    const userID = getCurrentUserId();
    optionRef.transaction((opt) => {
      if (opt) {
        if (opt.text.toLowerCase() === optionObj.text.toLowerCase()) {
          if (opt.responses[userID]) {
            opt.responses[userID] = null;
          } else {
            opt.responses[userID] = true;
          }
          opt.votes = optionObj.votes;
        }
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
    //console.log('removeOption was triggered', optionObj);
    const optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/uid/${optionObj.id}`);
    optionRef.remove()
      .then(function() {
        console.log("Remove succeeded.")
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }

  // get poll options from firebase w/ user votes
  getOptions() {
    firebaseDB.ref(`/groups/${this.state.group}/polls/uid/`).orderByChild('votes').on('value', (snapshot) => {
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
    //console.log('RENDER POLL', this.state.input, this.state.options);
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
