import getResultsFromKeyword from '../google/googlePlaces';

describe('getResultsFromKeyword', () => {
  it('is a function', () => {
    expect(typeof getResultsFromKeyword).toBe('function');
  });
  it('accepts a location and keyword', () => {
    expect(getResultsFromKeyword.length).toBe(2);
  });
  it('returns a promise', () => {
    expect(typeof getResultsFromKeyword()).toBe('object');
  });
});
