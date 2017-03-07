import React, { Component } from 'react';
import { ListView, View, TextInput, TouchableOpacity, NavigatorIOS } from 'react-native';
import { Container, Content, Text, Button, ListItem, Icon } from 'native-base';
import { firebaseDB } from '../../firebase/firebaseHelpers';
import Poll from './Poll';

export default class PollList extends Component {
  //input new poll name
  //submit button to create a new poll entry in db
    //anncounce it in chat
    //forward to Poll component

  //show list of active polls
  //allow poll deletion

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user ? this.props.user.displayName : 'Anonymous',
      group: this.props.groupName ? this.props.groupName : 'Default',
      input: '',
      polls: [],
    };
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.addPoll = this.addPoll.bind(this);
    this.removePoll = this.removePoll.bind(this);
  }

  componentWillMount() {
    this.getPolls();
  }

  getPolls() {
    firebaseDB.ref(`/groups/${this.state.group}/polls/`)
    .on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          polls: snapshot.val(),
        }, () => {
          console.log('GetPolls State', this.state.polls);
        });
      }
    });
  }

  addPoll() {
    const pollRef = firebaseDB.ref(`/groups/${this.state.group}/polls/`).push();
    //console.log('ID', pollRef.key);
    pollRef.set({
      text: this.state.input,
      id: pollRef.key,
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

  removePoll(pollID) {
    //console.log('removeOption was triggered', pollID);
    const pollRef = firebaseDB.ref(`/groups/${this.state.group}/polls/${pollID}`);
    pollRef.remove()
      .then(() => {
        console.log('Remove Poll succeeded.');
      })
      .catch((error) => {
        console.log('Remove Poll failed: ' + error.message);
      });
  }

  showPoll(poll) {
    this.props.navigator.push({
      component: Poll,
      title: poll.text,
      passProps: {
        poll,
        groupName: this.state.group,
      },
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, paddingTop: 22, height: 500 }}>
            <ListView
              enableEmptySections
              dataSource={this.ds.cloneWithRows(this.state.polls)}
              renderRow={(rowData) =>
                <ListItem id={rowData.id}>
                  <TouchableOpacity onPress={() => this.showPoll(rowData)}>
                    <Text>{rowData.text}</Text>
                  </TouchableOpacity>
                  <Icon
                    name={'trash'}
                    style={{ color: 'red' }}
                    onPress={() => this.removePoll(rowData.id)}
                  />
                </ListItem>
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
                onChangeText={(t) => {
                  this.setState({ input: t });
                }}
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
              <Button small onPress={this.addPoll} disabled={this.state.input.length < 1}>
                <Text style={{ color: 'white' }}>Add Poll</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

PollList.propTypes = {
  groupName: React.PropTypes.string.isRequired,
  navigator: React.PropTypes.object.isRequired,
};

