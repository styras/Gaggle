// Uncomment for tests
// import fetch from 'node-fetch';

export const isValidGiphyCommand = (string) => {
  let giphyStringSplit;
  // Check string exists and /giphy is first part
  if (string && string.indexOf('/giphy') === 0) {
    // Check if there is a space between command and keywords and keywords exist
    giphyStringSplit = string.split(' ');
    if (giphyStringSplit[0] === '/giphy' && giphyStringSplit[1]) {
      return true;
    }
  }
  return false;
};

export const parseGiphyCommand = (string) => {
  const giphyStringSplit = string.split(' ');
  return giphyStringSplit.slice(1).join(' ');
};

export const getGiphyResultFromKeyword = (keyword) => {
  const url = `http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${keyword}`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(responseJSON => resolve(responseJSON.data))
      .catch(error => reject(error));
  });
};
