import React from 'react';
import { Grid, Row } from 'react-native-easy-grid';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon } from 'native-base';

const styles = StyleSheet.create({
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

const GroupList = ({ _handleChangePage, userGroups, deleteGroup, uid }) => {
  return (
    <Grid>
      {userGroups.map((group, i) => (
        <Row
          key={i}
          style={styles.li}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => _handleChangePage(group || '')}
          >
            <Text>{group}</Text>
            <Icon
              name={'arrow-forward'}
              style={{ paddingRight: 20 }}
            />
          </TouchableOpacity>
          <Icon 
            name={'trash'}
            style={{ color: 'red' }}
            onPress={(group) => deleteGroup(uid, group)}
          />
        </Row>
        ))
      }
    </Grid>
  );
};

GroupList.propTypes = {
  _handleChangePage: React.PropTypes.func.isRequired,
  userGroups: React.PropTypes.array.isRequired,
  deleteGroup: React.PropTypes.func.isRequired,
  uid: React.PropTypes.string.isRequired,
};

export default GroupList;
