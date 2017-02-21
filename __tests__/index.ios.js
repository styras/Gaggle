import 'react-native';
import React from 'react';
import Index from '../index.ios.js';
import { firebaseRef, firebaseDB } from '../firebase/config.js';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Index />
  );
});
