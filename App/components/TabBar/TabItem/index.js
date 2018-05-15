import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { navigate } from '../../../actions/nav-actions'
import { background, highlight1, highlight4, highlight3, highlight2 } from '../../../styles/colors';
import { Icon } from 'expo'
const {Ionicons} = Icon


class TabItem extends Component {
  constructor(props){
    super(props)
    this.nav = this.nav.bind(this)
  }

  styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: 'yellow',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 2,
      borderTopColor: 'white'
    },
    active: {
      borderTopColor: highlight3,
    },
    text: {
      color: 'white',
      fontSize: 14
    },
    iconTextContainer:{
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

  nav(route){
    const { active, navigate, onPress } = this.props
    if (active){
      return
    }
    if (typeof onPress === 'function'){
      onPress(route)
      return
    }
    navigate(route)
  }

  render(){
    const { active, navigate, children } = this.props
    let iconName = ''
    if (children == 'Community') iconName = 'ios-compass-outline'
    if (children == 'MyEvents') iconName = 'ios-calendar-outline'
    if (children == 'Profile') iconName = 'ios-person-outline'
    return (
      <TouchableOpacity onPress={() => this.nav(children)} style={[this.styles.container, active ? this.styles.active : {}]}>
        <View style={this.styles.iconTextContainer}>
          <Ionicons name={iconName} color={active ? highlight3 : 'white'} size={22}/>
          <Text style={[this.styles.text,active ? {fontWeight:'bold', color: highlight3}:{}]}>{children}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default connect (null, (dispatch) => ({  
  navigate: (route) => dispatch(navigate(route))
}))(TabItem)