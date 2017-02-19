import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'native-base';
import SecondPage from './../../components/SecondPage/SecondPage.js';

export default class FirstPage extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
  }

  _handleChangePage() {
    this.props.navigator.push({
      component: SecondPage,
      title: "Second Page"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>FirstPage</Text>

        <Button primary onPress={this._handleChangePage}>
          <Text style={styles.buttonText}>Go to SecondPage</Text>
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
