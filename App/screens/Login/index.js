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
import {
  LoginManager,
  AccessToken
} from 'react-native-fbsdk'
import Login from './Login';

/* ::
  type Props = {};
*/

export default class LoginContainer extends Component/* :: <Props> */ {

  login = async () => {
    const { isCancelled } = await LoginManager.logInWithReadPermissions([
      'public_profile',
      'user_friends'
    ])
    if (!isCancelled) {
      const token = await AccessToken.getCurrentAccessToken()
      console.warn(token.accessToken.toString())
    }
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

