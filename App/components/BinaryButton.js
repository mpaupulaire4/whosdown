import React, { Component } from 'react'
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'

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
  static propTypes = {
    selected: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired,
    onTabChange: PropTypes.func
  }

  onChangeTab = (selected) => {
    if (selected === this.props.selected){
      return
    }
    this.props.onTabChange(selected)
  }

  render() {
    const { options, selected } = this.props;
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