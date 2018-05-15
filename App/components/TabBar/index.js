import React, { Component } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import TabItem from './TabItem'
import { connect } from 'react-redux'
import { background, highlight1, highlight4, highlight3, highlight2 } from '../../styles/colors';

export default class TabBar extends Component {
  constructor(props) {
    super(props)
    this.routes = props.navigationState.routes.map((route) => route.key)
  }

  styles = StyleSheet.create({
    container: {
      height: 55,
      backgroundColor: background,
      flexDirection: 'row'
    }
  })

  render() {
    const { navigationState } = this.props
    const activeIndex = navigationState.index
    return (
      <View style={this.styles.container}>
        {this.routes.map((route, index) => {
          if (route === 'Login') {
            return null
          }
          return <TabItem active={activeIndex === index} key={route}>{route}</TabItem>
        })}
      </View>
    )
  }
}
