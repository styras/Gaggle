import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, TabHeading, Icon, Text, Header } from 'native-base';
import Chat from '../Chat/Chat';
import MapDisplay from '../MapDisplay/MapDisplay';

export default class GroupMapChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  render() {
    return (
      <Container>
        <Header hasTabs />
        <Content scrollEnabled={false}>
          <Tabs>
            <Tab heading={<TabHeading><Icon name="compass" /><Text>Map</Text></TabHeading>}>
              <MapDisplay user={this.props.user} />
            </Tab>
            <Tab heading={<TabHeading><Icon name="chatboxes" /><Text>Chat</Text></TabHeading>}>
              <Chat user={this.state.user} groupName={this.props.groupName ? this.props.groupName : 'Default'} />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    );
  }
}

GroupMapChat.propTypes = {
  user: React.PropTypes.object.isRequired,
  groupName: React.PropTypes.string.isRequired,
};
