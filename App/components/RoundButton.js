import React, { Component } from 'react'
import { 
  TouchableOpacity,
  StyleSheet,
  Text
} from 'react-native'
import { background } from '../styles/colors'

export default class RoundButton extends Component {
  static defaultProps = {
    color: background,
    width: 160,
    height: 35
  }
  constructor(props) {
    super(props)
  }

  styles = StyleSheet.create({
    container: {
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    }, 
    title: {
      color: 'white'
    }
  })

  render() {
    const { title, style, textStyle, height, width, color, ...props } = this.props
    return (
      <TouchableOpacity style={[this.styles.container, {height, width, backgroundColor: color}, style]} {...props}>
        <Text style={[this.styles.title, textStyle]}>{title}</Text>
      </TouchableOpacity> 
    )
  }
}
