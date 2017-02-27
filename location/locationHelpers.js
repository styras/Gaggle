export const getUserLocation = () => (
  new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
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
