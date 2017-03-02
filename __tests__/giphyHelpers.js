import { isValidGiphyCommand, parseGiphyCommand } from '../giphy/giphyHelpers';

describe('isValidGiphyCommand', () => {
  it('is a function', () => {
    expect(typeof isValidGiphyCommand).toBe('function');
  });
  it('takes a string as an argument', () => {
    expect(isValidGiphyCommand.length).toBe(1);
  });
  it('returns a boolean', () => {
    const result = isValidGiphyCommand();
    expect(typeof result).toBe('boolean');
  });
  it('returns false if the command doesn\'t have a search term', () => {
    const result = isValidGiphyCommand('/giphy ');
    expect(result).toBe(false);
  });
  it('returns false if the string is not a giphy command', () => {
    const result = isValidGiphyCommand('some other stuff giphy/ /giphy');
    expect(result).toBe(false);
  });
  it('return true if the string is a valid giphy command', () => {
    const result = isValidGiphyCommand('/giphy cats');
    expect(result).toBe(true);
  });
});

describe('parseGiphyCommand', () => {
  it('is a function', () => {
    expect(typeof parseGiphyCommand).toBe('function');
  });
  it('takes a string as an argument', () => {
    expect(parseGiphyCommand.length).toBe(1);
  });
  it('returns a string', () => {
    const result = isValidGiphyCommand('/giphy cats');
    expect(typeof result).toBe('string');
  });
  it('returns a single word if the keyword was a single word', () => {
    const result = isValidGiphyCommand('/giphy cats');
    expect(result).toEqual('cats');
  });
  it('returns a string of multiple keywords if they were provided', () => {
    const result = isValidGiphyCommand('/giphy random stuff here');
    expect(result).toEqual('random stuff here');
  });
});
