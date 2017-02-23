import 'react-native';
import React from 'react';
import MapDisplay from '../components/MapDisplay/MapDisplay.js';
import { firebaseRef } from '../firebase/config.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <MapDisplay />,
  );
  expect(tree).toMatchSnapshot();
});
