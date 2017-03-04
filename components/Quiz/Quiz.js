import React, { Component } from 'react';
import { Container, Content, Header, DeckSwiper, Card, CardItem, Body, Text, Button, Icon, H3 } from 'native-base';
import getTriviaQuestions from '../../opentdb/opentdbHelpers';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };

    this.getNewQuestions(10);
  }

  getNewQuestions = (num) => {
    getTriviaQuestions(num)
      .then(questions => this.setState({ questions }));
  }

  render() {
    return (
      <Container>
        <Header />
        <Content scrollEnabled={false}>
          {this.state.questions.length > 0 &&
          <DeckSwiper
            dataSource={this.state.questions}
            renderItem={question =>
              <Card>
                <CardItem>
                  <Body>
                    <H3 style={{ marginTop: 10, marginBottom: 10 }}>{question.category}</H3>
                    <Text>{question.question.replace(/&quot;/ig, '"')}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  <Text>{question.incorrect_answers}</Text>
                </CardItem>
              </Card>
            }
          />
          }
          <Text style={{ marginTop: 200 }}>{ JSON.stringify(this.state.questions) }</Text>
        </Content>
      </Container>
    );
  }
}
