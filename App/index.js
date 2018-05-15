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
import AppNav from './screens/screens'
/* ::
  type Props = {};
*/

export default class App extends Component/* :: <Props> */ {
  render() {
    return (
      <AppNav/>
    );
  }
}
