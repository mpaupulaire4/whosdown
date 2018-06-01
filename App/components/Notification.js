import React, { Component } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = {
  outerContainer: {
    position: 'absolute',
    left: 10,
    top: 50,
    alignSelf: 'center',

  },
  container: {
    width: 350,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#870904',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    paddingHorizontal:15,
    paddingVertical: 10,

  },
  errorText: {
    color: 'white',
    fontSize: 20,
    textShadowColor: '#5b0000',
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 }
  }
}


export default class Notification extends Component {
  static defaultProps = {
    timeout: 3500,
    message: 'Sorry, something went wrong!'
  }

  state = {
    value: new Animated.Value(0)
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    this.state.value.setValue(0)
    Animated.timing(
      this.state.value, {
        toValue: 1,
        duration: this.props.timeout,
        easing: Easing.linear
      }
    ).start()
  }
  render() {
    const marginLeft = this.state.value.interpolate({
      inputRange: [0, .05, .95, 1],
      outputRange: [-350, 15, 15, -350]
    })
    return (
      <Animated.View style={[styles.outerContainer, { left: marginLeft }]} >
        <LinearGradient
          colors={['#a8241f', '#820f0f']}
          start={[0.95, 0.2]}
          end={[0.1, 0.4]}
          style={styles.container}
        >
          <Text style={styles.errorText}>{this.props.message}</Text>
        </LinearGradient>
      </Animated.View>
    )
  }
}