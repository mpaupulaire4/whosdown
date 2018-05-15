import React, { Component } from 'react'
import {
  View,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo'

export default class Notification extends Component {
  constructor(props) {
    super(props)
    this.animatedValue = new Animated.Value(0);
    this.animate = this.animate.bind(this)
    this.animationDuration = this.props.timeout || 3500
    this.state = { animate: true }
  }
  componentDidMount() {
    this.animate()
  }
  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue, {
        toValue: 1,
        duration: this.animationDuration,
        easing: Easing.linear
      }
    ).start()
  }
  styles = {
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
  render() {
    const marginLeft = this.animatedValue.interpolate({
      inputRange: [0, .05, .95, 1],
      outputRange: [-350, 15, 15, -350]
    })
    return (
      <Animated.View style={[this.styles.outerContainer, { left: marginLeft }]} >
        <LinearGradient
          colors={['#a8241f', '#820f0f']}
          start={[0.95, 0.2]}
          end={[0.1, 0.4]}
          style={this.styles.container}>
          <Text style={this.styles.errorText}>{this.props.message || "Sorry, something went wrong!"}</Text>
        </LinearGradient>
      </Animated.View>
    )
  }
}