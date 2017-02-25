export default () => (
  new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve([position.coords.latitude, position.coords.longitude]);
    });
  })
);
