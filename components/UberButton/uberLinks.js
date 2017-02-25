import { clientID } from '../../uber/config';

export const getUberDeepLink = (pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude) => (
  `uber://?client_id=${clientID}
  &action=setPickup
  &pickup[latitude]=${pickupLatitude}
  &pickup[longitude]=${pickupLongitude}
  &dropoff[latitude]=${dropoffLatitude}
  &dropoff[longitude]=${dropoffLongitude}
  &link_text=Gaggle%20App%20`
);

export const getUberUniversalLink = (pickupLatitude, pickupLongitude, dropoffLatitude, dropoffLongitude) =>
(
  `https://m.uber.com/ul/?client_id=${clientID}
  &action=setPickup
  &pickup[latitude]=${pickupLatitude}
  &pickup[longitude]=${pickupLongitude}
  &dropoff[latitude]=${dropoffLatitude}
  &dropoff[longitude]=${dropoffLongitude}
  &link_text=Gaggle%20App`
);
