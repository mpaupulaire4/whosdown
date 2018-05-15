import React, { PureComponent } from 'react'
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Image,
} from 'react-native'
import Proptypes from 'prop-types';
import Colors from '../../styles/colors'
import Button from '../../components/Button';
import Gradient from '../../components/Gradient';
import WDLogo from '../../assets/images/wd_logo.png';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 300,
  },
  loginContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  wdLogo: {
    height: 80,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center'
  }
})

export default class Login extends PureComponent {

  static propTypes = {
    onLoginPress: Proptypes.func.isRequired,
  }

  render() {
    return (
      <Gradient style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.wdLogo} source={WDLogo} />
            <Text style={styles.logoText}>Who's Down?</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button icon="facebook" title='Log in with Facebook' onPress={this.props.onLoginPress} />
          </View>
        </View>
      </Gradient>
    )
  }
}