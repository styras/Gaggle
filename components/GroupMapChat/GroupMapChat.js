import React, { Component } from 'react';
import { Container, Content, Tab, Tabs, TabHeading, Icon, Text, Header } from 'native-base';

export default class GroupMapChat extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs />
        <Content>
          <Tabs>
            <Tab heading={ <TabHeading><Icon name="compass" /><Text>Map</Text></TabHeading>}>
              <Text>Tab 1</Text>
            </Tab>
            <Tab heading={ <TabHeading><Icon name="chatboxes" /><Text>Chat</Text></TabHeading>}>
              <Text>Tab 2</Text>
            </Tab>
          </Tabs>
        </Content>
      </Container>
    )
  }
}