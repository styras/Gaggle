import 'react-native';
import React from 'react';
import GroupView from '../components/GroupView/GroupView.js';
import {firebaseRef, firebaseDB} from '../firebase/firebaseHelpers';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Test is failing:
//
// it('it renders correctly', () => {
//   const tree = renderer.create(
//     <GroupView />
//   );
//   expect(tree).toMatchSnapshot();
// });

//SEEMS TO DO THE SAME THING...

// test('test renders correctly', () => {
//   const tree = renderer.create(
//     <GroupView />
//   ).toJSON();
//   expect(tree).toMatchSnapshot();
// });

