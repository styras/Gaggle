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
      .then(questions => {
        const questionsCopy = questions.slice();

        questionsCopy.forEach((obj, index) => {
          // Replace HTML entities
          obj.question = obj.question.replace(/&quot;/ig, '"');
          obj.question = obj.question.replace(/&#039;/ig, '\'');
          // Store array index for answer lookup
          obj.index = index;
          // Shuffle all answers for user display
          obj.shuffled = obj.incorrect_answers.concat(obj.correct_answer);
          this._shuffle(obj.shuffled);
        });

        this.setState({ questions: questionsCopy });
      });
  }

  _shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
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
                  <Text>{question.index}</Text>
                </CardItem>
                <CardItem>
                  <Text>{JSON.stringify(question.shuffled)}</Text>
                </CardItem>
                <CardItem>
                  <Text>{question.correct_answer}</Text>
                </CardItem>
                <CardItem>
                  <Text>{JSON.stringify(question.incorrect_answers)}</Text>
                </CardItem>
              </Card>
            }
          />
          }
        </Content>
      </Container>
    );
  }
}
