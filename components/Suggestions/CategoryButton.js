import React from 'react';
import { Button, Text } from 'native-base';

const CategoryButton = props => (
  <Button
    block
    style={{ margin: 5, marginTop: 0 }}
    onPress={() => props.getSuggestions(props.category)}
  >
    <Text>{props.category}</Text>
  </Button>
);

CategoryButton.propTypes = {
  category: React.PropTypes.string.isRequired,
  getSuggestions: React.PropTypes.func.isRequired,
};

export default CategoryButton;
