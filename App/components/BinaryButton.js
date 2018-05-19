import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'

const styles = StyleSheet.create({
  toggleContainer: {
    height: 35,
    borderColor: 'rgba(255,255,255,.4)',
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row'
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toggleButtonText: {
    color: 'white'
  },
  publicFriendFilter: {
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
})

export default class BinaryButton extends Component {
  state = {
    selected: this.props.options[0],
  }

  onChangeTab = (selected) => {
    if (selected === this.state.selected){
      return
    }
    this.props.onTabChange(selected)
    this.setState({selected})
  }

  render() {
    const { options } = this.props;
    const { selected } = this.state;
    return (
      <View style={styles.publicFriendFilter}>
        <View style={styles.toggleContainer}>
          {options.map((option) => (
            <TouchableHighlight
              underlayColor='rgba(255,255,255,.6)'
              key={option}
              onPress={() => this.onChangeTab(option)}
              style={[styles.toggleButton, selected === option ? { backgroundColor: 'rgba(255,255,255,.4)' } : {}]}>
              <Text style={[styles.toggleButtonText]}>{option}</Text>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    )
  }
}