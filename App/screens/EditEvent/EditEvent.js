/**
 * @flow
 */

import React, { Component, Pure } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import DateTimePicker from 'react-native-modal-datetime-picker'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Map } from 'immutable'
import {
  background,
  highlight1,
  silver,
  shadow
} from '../../styles/colors'
import Gradient from '../../components/Gradient'
import HeaderBar from '../../components/HeaderBar'
import GrowingInput from '../../components/GrowingInput'
import BinaryButton from '../../components/BinaryButton'
import RoundButton from '../../components/RoundButton'
import LocationInput from '../../components/LocationInput'


/* ::
  type Props = {};
*/

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1
  },
  cardContainer: {
    backgroundColor: silver(),
    flexDirection: 'row',
    borderRadius: 5,
    ...shadow
  },
  imageContainer: {
    backgroundColor: background,
    width: '10%',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5
  },
  cardInfo: {
    margin: 15,
    flex: 1,
  },
  slideContainer: {
    backgroundColor: silver(),
    marginTop:1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  footer: {
    backgroundColor: silver(),
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


export default class EditEvent extends Component/* :: <Props> */ {
  static propTypes = {
    onBack: PropTypes.func,
    event: PropTypes.object,
    onSave: PropTypes.func.isRequired
  }


  state = {
    event: Map({
      title: '',
      description: '',
      time: new Date(),
      visibility: 'PRIVATE',
      location: {
        latitude: 0,
        longitude: 0,
      },
      ...this.props.event,
    }),
    picker: false,
  }

  timeInput = null
  save = () => {
    const event = this.state.event.toJS()
    if (!event.title || !event.description) {
      // SET ERRORS
      return
    }
    return this.props.onSave(event)
  }
  showDatePicker = () => this.setState({ picker: true })
  hideDatePicker = () => {
    this.timeInput && this.timeInput.blur();
    return this.setState({ picker: false })
  }
  onChangeEvent = (key, value) => this.setState({event: this.state.event.set(key, value)})
  onDateChange = (date) => {
    this.hideDatePicker()
    return this.onChangeEvent('time', date);
  }
  render() {
    const { onBack } = this.props
    const { event, picker } = this.state
    return (
      <Gradient style={{flex: 1}}>
        <HeaderBar
          title={'Create Event'}
          onBack={onBack}
        />
        <View style={styles.container}>
          <View style={styles.cardContainer}>
            <View style={styles.imageContainer}/>
            <View style={styles.cardInfo}>
              <TextInput
                placeholder='Title'
                value={event.get('title')}
                onChangeText={(text) => this.onChangeEvent('title', text)}
              />
              <GrowingInput
                placeholder='Description'
                value={event.get('description')}
                onChangeText={(text) => this.onChangeEvent('description', text)}
              />
              <LocationInput />
              <Text
                onPress={this.showDatePicker}
              >{moment(event.get('time')).calendar()}</Text>
            </View>
          </View>
          <View style={styles.slideContainer}>
            <BinaryButton
              selected={event.get('visibility')}
              options={['PUBLIC', 'PRIVATE', 'NONE']}
              onTabChange={(v) => this.onChangeEvent('visibility', v)}
            />
            <Text>
              location
            </Text>
            <Text>
              invites
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
          <RoundButton
            title='Save'
            onPress={this.save}
          />
        </View>
        <DateTimePicker
          isVisible={picker}
          mode='datetime'
          onConfirm={this.onDateChange}
          onCancel={this.hideDatePicker}
          date={event.get('time')}
        />
      </Gradient>
    );
  }
}

