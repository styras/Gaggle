import React from 'react';
import { List, ListItem, Text } from 'native-base';

const Results = (props) => {
  const goToResultDetails = (details) => {
    console.log(details);
    console.log(props);
  };

  return (
    <List>
      {props.results.map(result => (
        <ListItem
          key={result.id}
          onPress={() => goToResultDetails(result)}
        >
          <Text>
            {result.name}{'\n'}
            [{result.geometry.location.lat}, {result.geometry.location.lng}]{'\n'}
            {result.vicinity}
          </Text>
        </ListItem>
      ))}
    </List>
  );
};

Results.propTypes = {
  results: React.PropTypes.array.isRequired,
};

export default Results;
