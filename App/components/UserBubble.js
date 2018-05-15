import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native'
import { background, highlight1, highlight4, highlight3, highlight2 } from '../styles/colors';

export default class UserBubble extends Component {
  static defaultProps = {
    size: 56
  }
  constructor(props) {
    super(props)
  }
  styles = {
    userPicture: {
      height: this.props.size,
      width: this.props.size ,
      borderRadius: this.props.size / 2,
      alignSelf: 'center',
    },
    container: {
      marginHorizontal: 5,
      alignItems: 'center'
    },
    nameText: {
      fontSize: this.props.size / 3,
      color: highlight1,
      textAlign: 'center'
    },
    pictureContainer: {
      height: this.props.size,
      width: this.props.size,
      borderRadius: this.props.size / 2,
    }
  }
  render() {
    return (
      <TouchableOpacity onPress={() => console.log('pressed my face!')}>
        <View  style={this.styles.container}>
          <View style={this.styles.pictureContainer}>
            <Image source={{ uri: this.props.user.photoURL }} style={this.styles.userPicture} />
          </View>
          <Text style={this.styles.nameText}>{this.props.user.displayName.split(' ')[0]}</Text>
        </View>
      </TouchableOpacity>)
  }
}