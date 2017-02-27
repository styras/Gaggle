export const getUserLocation = () => (
  new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  })
);

export const findCentroidFromArray = (latLngArray) => {
  if (latLngArray.length === 1) {
    return latLngArray[0];
  } else {
    return [];
  }
};
