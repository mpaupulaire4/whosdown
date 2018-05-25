import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import UserBubble from '../UserBubble'
import { highlight1 } from '../../styles/colors'

const styles = StyleSheet.create({
  participantContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingVertical: 5,
  }
})

export default class ParticipantsListing extends Component {
  static propTypes = {
    size: PropTypes.number,
    participants: PropTypes.array.isRequired,
  }

  static defaultProps = {
    participants: [],
    size: 40,
  }

  render() {
    const { participants } = this.props
    const eventParticipants = participants.map((user, index) => {
      return (
        <UserBubble size={this.props.size} key={user.id} user={user} />
      )
    })
    return (
      <View style={styles.participantContainer}>
        {eventParticipants}
      </View>
    )
  }
}