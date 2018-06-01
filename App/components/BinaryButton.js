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
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
  },
  toggleButton: {
    paddingVertical: 5,
    borderRightWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  toggleButtonText: {
    color: 'white'
  },
})

export default class BinaryButton extends Component {
  static propTypes = {
    selected: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired,
    onTabChange: PropTypes.func.isRequired,
    color: PropTypes.string,
  }

  static defaultProps = {
    color: 'rgba(255,255,255,.4)'
  }

  onChangeTab = (selected) => {
    if (selected === this.props.selected){
      return
    }
    this.props.onTabChange(selected)
  }

  render() {
    const { options, selected, color } = this.props;
    return (
      <View
        style={[
          styles.toggleContainer,
          { borderColor: color,}
        ]}
      >
        {options.map((option) => (
          <TouchableHighlight
            underlayColor='rgba(255,255,255,.6)'
            key={option}
            onPress={() => this.onChangeTab(option)}
            style={[
              styles.toggleButton,
              { borderRightColor: color, },
              selected === option ? { backgroundColor: color } : {}
            ]}
          >
            <Text style={[styles.toggleButtonText]}>{option}</Text>
          </TouchableHighlight>
        ))}
      </View>
    )
  }
}