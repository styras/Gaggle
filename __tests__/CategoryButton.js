import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CategoryButton from '../components/Search/CategoryButton';

describe('CategoryButton', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <CategoryButton category={'Fun'} getSuggestions={() => {}} />,
    );
    expect(tree).toMatchSnapshot();
  });
});
