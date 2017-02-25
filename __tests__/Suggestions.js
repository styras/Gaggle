import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Suggestions from '../components/Suggestions/Suggestions';
import CategoryButton from '../components/Suggestions/CategoryButton';

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

describe('CategoryButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <CategoryButton category={'Fun'} getSuggestions={() => {}} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
