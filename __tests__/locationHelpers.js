import { getUserLocation } from '../location/locationHelpers';

describe('getUserLocation', () => {
  it('is a function', () => {
    expect(typeof getUserLocation).toBe('function');
  });
  it('returns a promise', () => {
    expect(typeof getUserLocation()).toBe('object');
  });
});
