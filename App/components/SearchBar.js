import React, { Component } from 'react'
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TextInput
} from 'react-native'
import { Icon } from 'expo'
const { Ionicons } = Icon


export default class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      searchText: ''
    }
    this.onChangeText = this.onChangeText.bind(this)
  }

  onChangeText(searchText){
    this.setState({ searchText })
    this.props.onChangeText(searchText)
  }

  styles = StyleSheet.create({
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

  render(){
    const { searchIsFocused, searchText } = this.state
    const { onChangeText, ...props } = this.props;

    return (
      <View style={this.styles.searchBarContainer}>
        <Ionicons name='ios-search' color='white' size={30} style={this.styles.icon}/>
        <TextInput 
          {...props} 
          onChangeText={this.onChangeText}
          ref={c => this.searchBar = c} 
          onBlur={this.handleSearchBlur} 
          underlineColorAndroid='rgba(0,0,0,0)' 
          style={this.styles.searchBar} />
      </View>
    )
  }

}