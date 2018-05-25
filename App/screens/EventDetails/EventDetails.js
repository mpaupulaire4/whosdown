import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TextInput
} from 'react-native'
import moment from 'moment'
import PropTypes from 'prop-types'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Gradient from '../../components/Gradient'
import Button from '../../components/Button'
import HeaderBar from '../../components/HeaderBar'
import CommunityCard from '../../components/CommunityCard'
// import MapModal from '../../components/MapModal'
import { silver } from '../../styles/colors'

const HORIZONAL_PADDING = 15

const styles = {
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor:'white',
  },
  footer: {
    backgroundColor: silver(),
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
}

export default class EventDetails extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  static defaultProps = {
    chatOpen: false
  }

  state = {
    chatOpen: this.props.chatOpen
  }

  render() {
    const { chatOpen } = this.state
    const { event, onBack } = this.props
    return (
      <Gradient style={styles.container}>
        <HeaderBar title="Event Details" onBack={onBack}/>
        <View style={{padding: 15, flex: 1}}>
          <CommunityCard
            event={event}
            locked
            open
            actions={false}
            chatOpen={this.state.chatOpen}
          />
        </View>
        <View style={styles.footer}>
          <CommunityCard.Actions/>
        </View>
      </Gradient>
    )
  }
}