/**
 * @flow
 */

import React, { Component, Pure } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Login from './Login';
import FB from 'react-native-fbsdk'

/* ::
  type Props = {};
*/

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class LoginContainer extends Component/* :: <Props> */ {

  login = async () => {
    const result = await FB.LoginManager.logInWithReadPermissions([
      'public_profile',
      'user_friends'
    ]).then((result) => {
      console.warn(result)
    })
    console.warn(result)
  }

  render() {
    return (
      <Login onLoginPress={this.login}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

