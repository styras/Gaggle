import 'react-native';
import React from 'react';
import Signin from '../components/Signin/Signin.js';
import { firebaseRef } from '../firebase/config.js';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(
    <Signin />
  );
  expect(tree).toMatchSnapshot();

});

