import React, { Component } from 'react';
import { List, ListItem, InputGroup, Content, Input, Button, Text } from 'native-base';
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
        <List>
          <ListItem>
            <InputGroup>
              <Input
                ref={(component) => { this._groupInput = component; }}
                placeholder="Group Name"
              />
              <Button
                style={{ justifyContent: 'center' }}
                onPress={
                  () => addUserToGroup(this.state.user, this._groupInput._root._lastNativeText)
                }
              >
                <Text>Create/Join</Text>
              </Button>
            </InputGroup>
          </ListItem>
        </List>
      </Content>
    );
  }

}

CreateJoinGroup.propTypes = {
  user: React.PropTypes.object.isRequired,
};
