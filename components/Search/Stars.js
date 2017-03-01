import React from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';
import times from 'lodash/times';

const Stars = (props) => {
  let counter = -1;

  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      {times(props.stars, () => {
        counter += 1;
        return (<Icon key={counter} active name={'star'} style={{ color: '#FEBF00', fontSize: 20 }} />);
      })}
    </View>
  );
};

Stars.propTypes = {
  stars: React.PropTypes.number.isRequired,
};

export default Stars;
