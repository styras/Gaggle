import getResultsFromCategory from '../google/googlePlaces';

describe('getResultsFromCategory', () => {
  it('is a function', () => {
    expect(typeof getResultsFromCategory).toBe('function');
  });
  it('accepts a location and category', () => {
    expect(getResultsFromCategory.length).toBe(2);
  });
  it('returns a promise', () => {
    expect(typeof getResultsFromCategory()).toBe('object');
  });
});
