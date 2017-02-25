import { getUberDeepLink, getUberUniversalLink } from '../components/UberButton/uberLinks';

describe('getUberDeepLink', () => {
  it('is a function', () => {
    expect(typeof getUberDeepLink).toBe('function');
  });

  it('returns a string', () => {
    expect(typeof getUberDeepLink()).toBe('string');
  });

  it('returns an uber deep link', () => {
    expect(getUberDeepLink()).toEqual(expect.stringContaining('uber://'));
  });
});

describe('getUberUniversalLink', () => {
  it('is a function', () => {
    expect(typeof getUberUniversalLink).toBe('function');
  });

  it('returns a string', () => {
    expect(typeof getUberUniversalLink()).toBe('string');
  });

  it('returns an uber universal link', () => {
    expect(getUberDeepLink()).toEqual(expect.stringContaining('m.uber.com'));
  });
});
