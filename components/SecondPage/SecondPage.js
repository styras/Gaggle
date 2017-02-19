import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';

export default class SecondPage extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
  }

  _handleChangePage() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SecondPage</Text>

        <Button primary onPress={this._handleChangePage}>
          <Text style={styles.buttonText}>Go to FirstPage</Text>
        </Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    marginTop: 70
  },
  buttonText: {
    color: 'white'
  }
});
