import React, { Component } from 'react';
import { Row } from 'react-native-easy-grid';
import { getAllGroupsInUser } from '../../firebase/firebaseHelpers';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base';

const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default GroupList = (props) => {
  return (
    <Row
      key={i}
      style={styles.li}
      onPress={() => this._handleChangePage(group || '')}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>{group}</Text>
        <Icon name={'arrow-forward'} />
      </TouchableOpacity>
    </Row>
  );
};
