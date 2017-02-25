import { getResultsFromKeyword } from '../google/googlePlaces';

describe('getResultsFromKeyword', () => {
  it('is a function', () => {
    expect(typeof getResultsFromKeyword).toBe('function');
  });
  it('accepts a location, keyword, and radius', () => {
    expect(getResultsFromKeyword.length).toBe(3);
  });
  it('returns a promise', () => {
    expect(typeof getResultsFromKeyword([0, 0], 'fun')).toBe('object');
  });
});
