import 'react-native';
import React from 'react';
import GroupMapChat from '../components/GroupMapChat/GroupMapChat.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

xit('renders correctly', () => {
  const tree = renderer.create(
    <GroupMapChat />
  );
  expect(tree).toMatchSnapshot();
});