import React from 'react';
import { List, ListItem, Text } from 'native-base';
import { Col, Grid } from 'react-native-easy-grid';
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
          <Grid>
            <Col size={10}>
              <Text>{result.name}</Text>
            </Col>
            <Col size={1}>
              <Text>1 mi</Text>
            </Col>
          </Grid>
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
