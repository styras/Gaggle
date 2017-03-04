import React, { Component } from 'react';
import { Container, Content, Header, Text } from 'native-base';
import getTriviaQuestions from '../../opentdb/opentdbHelpers';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {},
    };

    this.getNewQuestion();
  }

  getNewQuestion = () => {
    getTriviaQuestions(1)
      .then(results => this.setState({ question: results[0] }));
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Text>{ JSON.stringify(this.state.question) }</Text>
        </Content>
      </Container>
    );
  }
}
