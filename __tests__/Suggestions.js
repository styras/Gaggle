import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Suggestions from '../components/Suggestions/Suggestions';

describe('Suggestions main component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Suggestions
        groupName={'Default'}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
