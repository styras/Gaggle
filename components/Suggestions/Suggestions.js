import React, { Component } from 'react';
import { Container, Header, Content, Text } from 'native-base';

export default class Suggestions extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>Hello World</Text>
          <Text>{this.props.groupName}</Text>
        </Content>
      </Container>
    );
  }
}

Suggestions.propTypes = {
  groupName: React.PropTypes.string.isRequired,
};
