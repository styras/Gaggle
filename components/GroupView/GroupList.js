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
          <View
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
          >
            <TouchableOpacity
              onPress={() => _handleChangePage(group || '')}
            >
              <Text
                style={{
                  fontSize: 25,
                }}
              >{group}</Text>
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                bottom: 13,
                right: 13,
                width: 50,
                height: 50,
                borderRadius: 50,
                backgroundColor: 'white',
              }}
            >
              <Icon
                name={'trash'}
                style={{
                  color: 'red',
                  position: 'absolute',
                  bottom: 7,
                  right: 16,
                }}
                onPress={() => deleteGroup(uid, group)}
              />
            </View>
          </View>
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
