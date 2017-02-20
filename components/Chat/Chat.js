import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Container, Header, Left, Right, Body, Footer, Content, Form, Item, Input, Icon, Button, Title, FooterTab, ListItem } from 'native-base';

export default class NewComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleChangePage = this._handleChangePage.bind(this);
  }

  _handleChangePage() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <Container>
        <Header>
          <Left></Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content>
          <ListItem>
            <Text>Kevin: </Text>
            <Text>Hey guys</Text>
          </ListItem>
          <ListItem>
            <Text>Gwynn: </Text>
            <Text>What's up?</Text>
          </ListItem>
          <ListItem>
            <Text>Erica: </Text>
            <Text>Nothing much</Text>
          </ListItem>
          <ListItem>
            <Text>Maxwell: </Text>
            <Text>Cool!</Text>
          </ListItem>
        </Content>
        <Footer>
          <TextInput style={styles.textInput}
            placeholder='Message'
          />
          <View style={{position: 'relative', top: 12}}>
            <Button small>
              <Text style={{color: 'white'}}>Send</Text>
            </Button>
          </View>
          <View style={{paddingRight: 10}}></View>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textInput:{
    flex:1,
    borderColor: 'grey',
    borderWidth: 1,
    paddingLeft: 10,
    margin: 10
  }
});
