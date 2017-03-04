export default function getTriviaQuestions(amount, difficulty = 'easy') {
  const url = `https://www.opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(responseJSON => resolve(responseJSON.results))
      .catch(error => reject(error));
  });
}
