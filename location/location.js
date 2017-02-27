export const getUserLocation = () => (
  new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  })
);
