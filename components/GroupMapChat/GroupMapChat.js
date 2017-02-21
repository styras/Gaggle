import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, TabHeading, Icon, Text, Header } from 'native-base';
import Chat from '../Chat/Chat.js';

export default class GroupMapChat extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs />
        <Content>
          <Tabs>
            <Tab heading={ <TabHeading><Icon name="compass" /><Text>Map</Text></TabHeading>}>
              <Text>Map goes here</Text>
            </Tab>
            <Tab heading={ <TabHeading><Icon name="chatboxes" /><Text>Chat</Text></TabHeading>}>
              <Chat />
            </Tab>
          </Tabs>
        </Content>
      </Container>
    )
  }
}