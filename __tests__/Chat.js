import 'react-native';
import React from 'react';
import Chat from '../components/Chat/Chat.js';
import { firebaseRef } from '../firebase/config.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

xit('renders correctly', () => {
  const tree = renderer.create(
    <Chat />
  );
  expect(tree).toMatchSnapshot();
});
