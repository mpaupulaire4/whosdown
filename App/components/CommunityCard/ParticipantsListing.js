import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import UserBubble from '../UserBubble'
import { highlight1 } from '../../styles/colors'

export default class ParticipantsListing extends Component {
  static defaultProps = {
    participants: {},
    size: 40,
  }
  constructor(props) {
    super(props)
    this.subscribeToEvent = this.subscribeToEvent.bind(this)
  }
  subscribeToEvent() {

  }
  styles = StyleSheet.create({
    participantContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      paddingVertical: 5,
    }
  })
  render() {
    let { participants } = this.props
    let eventParticipants = Object.keys(participants).map((value, index) => {
      return (
        <UserBubble size={this.props.size} key={value} user={participants[value]} />
      )
    })
    return (
      <View style={this.styles.participantContainer}>
        {eventParticipants}
      </View>
    )
  }
}