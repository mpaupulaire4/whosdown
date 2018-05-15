import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import React, { Component } from 'react'
import Colors from '../styles/colors'
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: 320,
    borderRadius: 4,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 22
  },
  iconStyle: {
    marginRight: 10,
  }
})

export default class Button extends Component {
  static defaultProps = {
    backgroundColor: 'rgba(255,255,255,0.2)'
  }

  render() {
    const { title, backgroundColor, ...props } = this.props
    let icon = null
    if (this.props.icon) {
      icon = <Icon name="facebook-official" size={30} color="white" style={styles.iconStyle} />
    }
    return (
      <TouchableOpacity style={[styles.container, { backgroundColor }]} {...props}>
        {icon}
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    )
  }
}