export const getUserLocation = () => (
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.latitude, position.coords.longitude]);
      },
      error => reject(error),
    );
  })
);

export const findCentroidFromArray = (latLngArray) => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let result = [];

  if (latLngArray.length === 1) {
    result = latLngArray[0];
  } else {
    for (let i = 0; i < latLngArray.length; i += 1) {
      const lat = latLngArray[i][0];
      const lng = latLngArray[i][1];
      minX = Math.min(minX, lat);
      maxX = Math.max(maxX, lat);
      minY = Math.min(minY, lng);
      maxY = Math.max(maxY, lng);
    }
    result = [(minX + maxX) / 2, (minY + maxY) / 2];
  }
  return result;
};

// milesOrKm is optional, default is returning miles
export const findDistanceBetweenCoords = (array1, array2, milesOrKm) => {
  let result = 0;
  const p = 0.017453292519943295; // Math.PI / 180
  const c = Math.cos;
  const kmMilesRatio = 0.62137;
  const a = 0.5 - c((array2[0] - array1[0]) * p)/2 +
            c(array1[0] * p) * c(array2[0] * p) *
            (1 - c((array2[1] - array1[1]) * p))/2;
  result = 12742 * Math.asin(Math.sqrt(a));
  if (milesOrKm !== 'km') {
    result *= kmMilesRatio;
  }
  return result;
};
