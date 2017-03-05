import React, { Component } from 'react';
import { Input, Button, Text, Item } from 'native-base';
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
          style={{ marginLeft: 10, height: 40 }}
          placeholder="Group Name"
          autoCapitalize={'none'}
        />
        <Button
          full
          style={{ justifyContent: 'center', paddingRight: 15, height: 40, position: 'relative', top: 1 }}
          onPress={
            () => {
              addUserToGroup(this.state.user, this._groupInput._root._lastNativeText);
              this._groupInput._root.setNativeProps({ text: '' });
            }
          }
        >
          <Text>Join</Text>
        </Button>
      </Item>
    );
  }

}

CreateJoinGroup.propTypes = {
  user: React.PropTypes.object.isRequired,
};
