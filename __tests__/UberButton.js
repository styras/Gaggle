import { getUberDeepLink, getUberUniversalLink } from '../components/UberButton/uberLinks';

describe('getUberDeepLink', () => {
  it('is a function', () => {
    expect(typeof getUberDeepLink).toBe('function');
  });

  it('returns a string', () => {
    expect(typeof getUberDeepLink()).toBe('string');
  });
});

describe('getUberUniversalLink', () => {
  it('is a function', () => {
    expect(typeof getUberUniversalLink).toBe('function');
  });

  it('returns a string', () => {
    expect(typeof getUberUniversalLink()).toBe('string');
  });
});
