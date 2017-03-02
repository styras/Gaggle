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

};
