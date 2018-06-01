import React, { Component } from 'react'
import {
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'
import { background } from '../styles/colors'


const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  title: {
    color: 'white'
  }
})

export default class RoundButton extends Component {
  static defaultProps = {
    color: background,
    width: 160,
    // height: 35
  }

  render() {
    const { title, style, textStyle, height, width, color, ...props } = this.props
    return (
      <TouchableOpacity style={[styles.container, {height, width, backgroundColor: color}, style]} {...props}>
        <Text style={[styles.title, textStyle]}>{title}</Text>
      </TouchableOpacity>
    )
  }
}
