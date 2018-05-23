import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TextInput
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    color: 'white',
  },
  searchBarContainer: {
    backgroundColor: 'rgba(255,255,255,.4)',
    flex: 1,
    height: 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    marginLeft: 15
  }
})

export default class SearchBar extends Component {

  render(){
    return (
      <View style={styles.searchBarContainer}>
        <Ionicons name='ios-search' color='white' size={30} style={styles.icon}/>
        <TextInput
          {...this.props}
          underlineColorAndroid='rgba(0,0,0,0)'
          style={styles.searchBar} />
      </View>
    )
  }
}