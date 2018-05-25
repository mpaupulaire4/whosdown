import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { background, highlight1, highlight4, highlight3, highlight2 } from '../styles/colors';

const styles = StyleSheet.create({
  userPicture: {
    alignSelf: 'center',
  },
  container: {
    marginHorizontal: 5,
    alignItems: 'center'
  },
  nameText: {
    color: highlight1,
    textAlign: 'center'
  },
  // pictureContainer: {
  //   height: this.props.size,
  //   width: this.props.size,
  //   borderRadius: this.props.size / 2,
  // }
})

export default class UserBubble extends Component {
  static defaultProps = {
    size: 56
  }

  render() {
    return (
      <TouchableOpacity onPress={() => console.log('pressed my face!')}>
        <View  style={this.styles.container}>
          <View style={{}}>
            <Image
              source={{ uri: this.props.user.photo_url }}
              style={[this.styles.userPicture, {
                height: this.props.size,
                width: this.props.size,
                borderRadius: this.props.size / 2
              }]}
            />
          </View>
          <Text
            style={[this.styles.nameText, {fontSize: this.props.size / 3}]}
          >{this.props.user.display_name.split(' ')[0]}</Text>
        </View>
      </TouchableOpacity>)
  }
}