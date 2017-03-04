import React, { Component } from 'react';
import { Input, Button, Text, Item, View } from 'native-base';
import { addUserToGroup } from '../../firebase/firebaseHelpers';

export default class CreateJoinGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };
  }

  render() {
    return (
      <Item>
        <Input
          ref={(component) => { this._groupInput = component; }}
          placeholder="Group Name"
          autoCapitalize={'none'}
          style={{
            paddingLeft: 15,
          }}
        />
        <Button
          small
          style={{
            margin: 10,
          }}
          onPress={
            () => addUserToGroup(this.state.user, this._groupInput._root._lastNativeText)
          }
        >
          <Text>Create/Join</Text>
        </Button>
      </Item>
    );
  }

}

CreateJoinGroup.propTypes = {
  user: React.PropTypes.object.isRequired,
};
