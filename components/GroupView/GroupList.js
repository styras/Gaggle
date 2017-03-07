import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';

const GroupList = ({ _handleChangePage, userGroups, deleteGroup, uid }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
        flexWrap: 'wrap',
      }}
    >
      {userGroups.map((group, i) => (
        <TouchableOpacity
          key={i}
          style={{
            shadowColor: 'black',
            shadowOpacity: 0.8,
            shadowRadius: 3,
            shadowOffset: {
              height: 0,
              width: 0,
            },
            backgroundColor: 'white',
            margin: 20,
            width: 100,
            height: 100,
          }}
          onPress={() => _handleChangePage(group || '')}
        >
          <Text
            style={{
              
            }}
          >{group}</Text>
          <Icon
            name={'trash'}
            style={{
              color: 'red',
              textAlign: 'center',
            }}
            onPress={() => deleteGroup(uid, group)}
          />
        </TouchableOpacity>
        ))
      }
    </View>
  );
};

GroupList.propTypes = {
  _handleChangePage: React.PropTypes.func.isRequired,
  userGroups: React.PropTypes.array.isRequired,
  deleteGroup: React.PropTypes.func.isRequired,
  uid: React.PropTypes.string.isRequired,
};

export default GroupList;
