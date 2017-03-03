import { getTriviaQuestions } from '../opentdb/opentdbHelpers';

describe('getTriviaQuestions', () => {
  it('is a function', () => {
    expect(typeof getTriviaQuestions).toBe('function');
  });
  it('accepts number of questions and difficulty arguments', () => {
    expect(getTriviaQuestions.length).toEqual(2);
  });
  it('returns an object with a category, question, and answers', () => {
    return getTriviaQuestions(1, 'easy')
      .then((results) => {
        expect(results[0].category).toBeDefined();
        expect(results[0].question).toBeDefined();
        expect(results[0].correct_answer).toBeDefined();
        expect(results[0].incorrect_answers).toBeDefined();
      });
  });
  it('returns an easy question when no difficulty is provided', () => {
    return getTriviaQuestions(1)
      .then((results) => {
        expect(results[0].difficulty).toBe('easy');
      });
  });
  it('returns a medium difficulty question with a medium difficulty argument', () => {
    return getTriviaQuestions(1, 'medium')
      .then((results) => {
        expect(results[0].difficulty).toBe('medium');
      });
  });
  it('returns a hard difficulty question with a hard difficulty argument', () => {
    return getTriviaQuestions(1, 'hard')
      .then((results) => {
        expect(results[0].difficulty).toBe('hard');
      });
  });
  it('returns multiple questions depending on the first argument', () => {
    return getTriviaQuestions(4)
      .then((results) => {
        expect(results.length).toBe(4);
      });
  });
});
