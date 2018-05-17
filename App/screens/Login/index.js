// @flow

import React, { Component, Pure } from 'react';
import {
  AsyncStorage,
} from 'react-native';
import {
  LoginManager,
  AccessToken
} from 'react-native-fbsdk'
import PropTypes from 'prop-types';
import Login from './Login';
import { WHOSDOWN_TOKEN_KEY } from '../../Data/constants'


export default class LoginContainer extends Component {

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  login = async () => {
    const { isCancelled } = await LoginManager.logInWithReadPermissions([
      'public_profile',
      'user_friends'
    ])
    if (!isCancelled) {
      const token = await AccessToken.getCurrentAccessToken()
      await AsyncStorage.setItem(WHOSDOWN_TOKEN_KEY, token.accessToken.toString())
      console.warn(token.accessToken.toString())
    }
  }

  render() {
    return (
      <Login onLoginPress={this.login}/>
    );
  }
}

