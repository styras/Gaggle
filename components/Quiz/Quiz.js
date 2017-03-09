import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { Container, Content, Header, DeckSwiper, Card, CardItem, Body, Text, Button, Icon, H3 } from 'native-base';
import * as he from 'he';
import getTriviaQuestions from '../../opentdb/opentdbHelpers';

const styles = {
  answerButton: {
    height: 40,
    width: Dimensions.get('window').width - 35,
    justifyContent: 'flex-start',
  }
};

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.getNewQuestions(10);
  }

  getNewQuestions = (num) => {
    getTriviaQuestions(num)
      .then(questions => {
        const questionsCopy = questions.slice();

        questionsCopy.forEach((obj, index) => {
          // Replace HTML entities
          obj.question = he.decode(obj.question);
          obj.correct_answer = he.decode(obj.correct_answer);
          obj.incorrect_answers = obj.incorrect_answers.map(answer => he.decode(answer));
          // Store array index for answer lookup
          obj.index = index;
          // Shuffle all answers for user display
          obj.shuffled = obj.incorrect_answers.concat(obj.correct_answer);
          this._shuffle(obj.shuffled);
          // Add variables to show incorrect or correct
          obj.showCorrect = false;
          obj.showIncorrect = false;
        });

        this.setState({ questions: questionsCopy });
      });
  }

  checkAnswer = (index, answer) => {
    const currentQuestion = this.state.questions[index];
    if (currentQuestion.answered) { return; }
    if (currentQuestion.correct_answer === answer) {
      currentQuestion.showCorrect = true;
      currentQuestion.answered = true;
    } else {
      currentQuestion.showIncorrect = true;
      currentQuestion.answered = true;
    }
    // Trigger rerender in a suboptimal way
    this.setState({ questions: this.state.questions });
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
              <Card style={{ height: Dimensions.get('window').height - 75 }}>
                <CardItem>
                  <Body>
                    <H3 style={{ marginTop: 10, marginBottom: 10 }}>{question.category}</H3>
                    <Text>{question.question.replace(/&quot;/ig, '"')}</Text>
                  </Body>
                </CardItem>
                <CardItem>
                  {question.showCorrect && <Text>Correct</Text>}
                  {question.showIncorrect && <Text>Incorrect, the correct answer was: {question.correct_answer}</Text>}
                </CardItem>
                {question.shuffled.map(answer => (
                  <CardItem key={answer}>
                    <Button
                      style={styles.answerButton}
                      onPress={() => this.checkAnswer(question.index, answer)}
                    >
                      <Text>{answer}</Text>
                    </Button>
                  </CardItem>
                ))}
                {question.index === 0 &&
                <CardItem>
                  <Text>Swipe for more questions!</Text>
                </CardItem>}
              </Card>
            }
          />
          }
        </Content>
      </Container>
    );
  }
}
