import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,

} from 'react-native';
import Routers from './src/router';
import { Provider } from 'react-redux';
import store from './src/store';
import { Container } from 'native-base';
import * as firebase from 'firebase';
import { Root } from "native-base";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Root>
            <Routers />
          </Root>
        </Container>
      </Provider>
    );
  };
};

