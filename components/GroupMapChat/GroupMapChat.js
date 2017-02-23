import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, TabHeading, Icon, Text, Header } from 'native-base';
import Chat from '../Chat/Chat.js';
import MapView from '../MapDisplay/MapDisplay.js';

export default class GroupMapChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }
  }

  render() {
    return (
      <Container>
        <Header hasTabs />
        <Content>
          <Tabs>
            <Tab heading={ <TabHeading><Icon name="compass" /><Text>Map</Text></TabHeading>}>
              <View>
                <MapDisplay />
              </View>
            </Tab>
            <Tab heading={ <TabHeading><Icon name="chatboxes" /><Text>Chat</Text></TabHeading>}>
              <Chat user={this.state.user} />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    )
  }
}
