import React, { Component } from 'react';
import { ListView, View, TextInput } from 'react-native';
import { Container, Content, Text, Button } from 'native-base';
import { firebaseDB, getCurrentUserId } from '../../firebase/firebaseHelpers';
import Option from './Option';

export default class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: this.props.groupName ? this.props.groupName : 'Default',
      pollID: this.props.pollID,
      pollTxt: this.props.pollTxt,
      input: '',
      options: [],
    };
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.addOption = this.addOption.bind(this);
    this.updateOption = this.updateOption.bind(this);
    this.removeOption = this.removeOption.bind(this);

    this.optionRef = firebaseDB.ref(`/groups/${this.state.group}/polls/${this.state.pollID}/options/`);
  }


  componentDidMount() {
    this.getOptions();
  }

  componentWillUnmount() {
    this.optionRef.off();
  }


  getOptions() {
    this.optionRef.on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          options: snapshot.val(),
        });
      }
    });
  }

  addOption() {
    const optRef = this.optionRef.push();
    optRef.set({
      text: this.state.input,
      votes: 0,
      id: optRef.key,
      responses: { 'dummy': 'data' },
    }, (error) => {
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
    const userID = getCurrentUserId();
    this.optionRef.child(optionObj.id).transaction((opt) => {
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
      console.log('UpdateOption Committed: ', committed, 'Option data: ', snapshot.val());
    });
  }


  removeOption(optionObj) {
    this.optionRef.child(optionObj.id).remove()
      .then(() => {
        console.log('Remove succeeded.');
      })
      .catch((error) => {
        console.log('Remove failed: ' + error.message);
      });
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, paddingTop: 80, height: 615 }}>
            <ListView
              enableEmptySections
              dataSource={this.ds.cloneWithRows(this.state.options)}
              renderRow={(rowData) =>
                <Option
                  id={rowData.id}
                  text={rowData.text}
                  votes={rowData.votes}
                  responses={rowData.responses}
                  updateOption={this.updateOption}
                  removeOption={this.removeOption}
                />
              }
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderTopWidth: 1,
              borderTopColor: 'lightgrey',
            }}
          >
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
              }}
            >
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
  groupName: React.PropTypes.string.isRequired,
  pollID: React.PropTypes.string.isRequired,
  pollTxt: React.PropTypes.string.isRequired,
};
