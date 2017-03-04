import GOOGLE_API_KEY from './config';

export const categories = ['Restaurants', 'Museums', 'Cafes', 'Shopping', 'Bars', 'Movies', 'Games', 'Recreation', 'Art', 'Music', 'Shows', 'Theaters', 'Skydiving'];

export const setPhotoProp = (results) => {
  const oldResults = this.state.results.slice();
  const newResults = [];
  oldResults.forEach((result) => {
    if (!result.photos) {
      result.photos = {photo_reference : 'CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU'};
    }
    newResults.push(result)
  });
  console.log('results are', results);
};

export const getResultsFromKeyword = (locationArray, keyword, radius) => {
  const latitude = locationArray[0];
  const longitude = locationArray[1];
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&keyword=${keyword}&key=${GOOGLE_API_KEY}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => resolve(responseJson))
      .catch(error => reject(error));
  });
};

export const getPlaceDetails = (placeId) => {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_KEY}`;

  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(responseJson => resolve(responseJson))
      .catch(error => reject(error));
  });
};

export const getPlacePhoto = (photoreference) => {
  const url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoreference}&key=${GOOGLE_API_KEY}`;

  return new Promise((resolve, reject) => {
    fetch(url)
       .then((response) => { console.log(response.url); resolve(response.url); })
       .catch(error => console.log(error));
    });
};

export const getPhotoProps = function () {
  const newResults = [];
  this.state.results.forEach((result) => {
    console.log('getting photo');
    const photoref = result.photos ? result.photos[0].photo_reference : 'no_photo';
    const newResult = result;
    // photoURL for results with no photoreference set to "photo not found" image
    if (photoref === 'no_photo') {
      newResult.photoURL = 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQuDbG_i4uiHR5rOBuCttQTZ7TU-QBVcsHRu5PtqWeVvLDwRkkQlA';
      newResults.push(newResult);
    } else {
      getPlacePhoto(photoref)
      .then((response) => {
        newResult.photoURL = response;
        newResults.push(newResult);
      });
    }
  });
  setTimeout(() => {
    this.setState({ results: newResults });
    console.log('results are', this.state.results);
  }, 5000);
};
