import React from 'react';
import { List, ListItem, Text } from 'native-base';
import ResultDetails from './ResultDetails';

const Results = (props) => {
  const goToResultDetails = (details) => {
    props.navigator.push({
      component: ResultDetails,
      title: details.name,
      passProps: { placeId: details.place_id },
    });
  };

  return (
    <List>
      {props.results.map(result => (
        <ListItem
          key={result.id}
          onPress={() => goToResultDetails(result)}
        >
          <Text>{result.name}</Text>
        </ListItem>
      ))}
    </List>
  );
};

Results.propTypes = {
  results: React.PropTypes.array.isRequired,
  navigator: React.PropTypes.object.isRequired,
};

export default Results;
