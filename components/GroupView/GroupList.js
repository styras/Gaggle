import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text, Icon } from 'native-base';
import stringToColor from './colorGenerator';

const GroupList = ({ _handleChangePage, userGroups, deleteGroup, uid }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}
    >
      {userGroups.map((group, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={{
              shadowColor: 'black',
              shadowOpacity: 0.7,
              shadowRadius: 5,
              shadowOffset: {
                height: 0,
                width: 0,
              },
              backgroundColor: stringToColor(group),
              marginTop: 30,
              marginHorizontal: 17,
              width: 150,
              height: 150,
              padding: 13,
            }}
            onPress={() => _handleChangePage(group || '')}
          >
            <Text
              style={{
                fontSize: 25,
              }}
            >{group}</Text>
            <Icon
              name={'trash'}
              style={{
                alignItem: 'center',
                color: 'red',
                position: 'absolute',
                bottom: 13,
                right: 13,
                width: 40,
                height: 40,
                borderRadius: 50,
                backgroundColor: 'white',
              }}
              onPress={() => deleteGroup(uid, group)}
            />
          </TouchableOpacity>
        );
      },
      )
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
