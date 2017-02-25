import React from 'react';
import { Button, Text } from 'native-base';

const CategoryButton = props => (
  <Button onPress={() => {}}>
    <Text>{props.category}</Text>
  </Button>
);

CategoryButton.propTypes = {
  category: React.PropTypes.string.isRequired,
};

export default CategoryButton;
