import React, { Component } from 'react';
import { Content, Input, Button, Text, Item } from 'native-base';
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
      <Content>
            <Item>
              <Input
                ref={(component) => { this._groupInput = component; }}
                style={{ marginLeft: 10 }}
                placeholder="Group Name"
                autoCapitalize={'none'}
              />
              <Button
                full
                style={{ justifyContent: 'center', height: 50 }}
                onPress={
                  () => {
                    addUserToGroup(this.state.user, this._groupInput._root._lastNativeText);
                    this._groupInput._root.setNativeProps({ text: '' });
                  }
                }
              >
                <Text>Create/Join</Text>
              </Button>
            </Item>
      </Content>
    );
  }

}

CreateJoinGroup.propTypes = {
  user: React.PropTypes.object.isRequired,
};
