import React, { PureComponent } from 'react'
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
  TouchableHighlight
} from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  background,
  highlight1,
  silver,
  shadow
} from '../../styles/colors';
import RoundButton from '../RoundButton';
import ParticipantsListing from './ParticipantsListing';

const ANIM_DURATION = 200

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 15,
    backgroundColor: 'transparent'
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
  image: {
    resizeMode: 'contain',
    width: 100
  },
  cardInfo: {
    margin: 15,
    flex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: background,
  },
  descriptionText: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
  },
  detailsText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 4
  },
  textIconContainer: {
    flexDirection: 'row',
    marginBottom: 7,
    marginRight: 10,
    alignItems: 'center'
  },
  timeLocationContainer: {
    flexDirection: 'row',
  },
  textSubContainer: {
    flexDirection: 'row',
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  slideContainer: {
    backgroundColor: silver(),
    paddingHorizontal: 15,
    paddingVertical: 20,
  }
})


export default class EventCard extends PureComponent {
  static propTypes = {
    joinEvent: PropTypes.func,
    openChat: PropTypes.func,
    onPress: PropTypes.func,
    event: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      time: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
      ]).isRequired,
      location: PropTypes.shape({
        address: PropTypes.string,
      })
    }).isRequired,
    actions: PropTypes.bool,
    locked: PropTypes.bool,
    slim: PropTypes.bool,
    open: PropTypes.bool,
  }

  static defaultProps = {
    actions: true,
    locked: false,
    slim: false,
    open: false
  }

  static Actions = ({onDown, onDiscussion, down = false }) => {
    return (
      <View style={[styles.buttonContainer]} >
        { down ? null : (
          <RoundButton
            color={background}
            title="I'M DOWN"
            onPress={onDown}
          />
        )}
        <RoundButton
          color={silver()}
          title="Discussion"
          onPress={onDiscussion}
          textStyle={{color: background}}
        />
      </View>
    )
  }

  state = {
    isExpanded: this.props.open,
  };

  componentWillReceiveProps = async ({ open, locked }) => {
    if (
      typeof open === 'boolean' &&
      typeof locked === 'boolean' &&
      this.state.isExpanded !== open &&
      !locked
    ){
      this.setState({ isExpanded:  !this.state.isExpanded})
    }
  }

  handleSlideToggle = async () => {
    const { onPress, locked, open } = this.props
    if (!locked) {
      this.setState({ isExpanded: !this.state.isExpanded })
    }
    onPress && onPress(this.props.event)
  }

  Slider = () => {
    const { event, actions, joinEvent, openChat } = this.props
    return (
      <View style={[ styles.slideContainer ]}>
        <Icon name="people"  color={background} size={25}/>
        <ParticipantsListing participants={event.participants} />
        {!actions ? null : (
          <EventCard.Actions onDown={joinEvent} onDiscussion={openChat}/>
        )}
      </View>
    )
  }

  render() {
    const { isExpanded } = this.state
    const { event, slim, actions, joinEvent } = this.props
    const locationDisplay = isExpanded ? event.location.address : (event.distance ? `${(Math.round((event.distance * 0.621371) * 10) / 10).toPrecision(2)} mi` : false)
    return (
      <View style={[styles.container]} >
        <TouchableWithoutFeedback onPress={this.handleSlideToggle}>
          <View style={styles.cardContainer} >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: event.image }}/>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.headerText}>{event.title}</Text>
              {slim ? null : <Text style={styles.descriptionText} >{event.description}</Text> }
              <View style={{flexDirection: isExpanded ? 'column' : 'row', marginTop: 10}}>
                {locationDisplay && (
                  <View style={styles.textIconContainer}>
                    <Icon color={background} size={20} name="location-pin" />
                    <Text style={styles.detailsText}>{locationDisplay}</Text>
                  </View>
                )}
                <View style={styles.textIconContainer}>
                  <Icon color={background} size={20} name="clock" />
                  <Text style={styles.detailsText}>{moment(event.time).calendar()}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {isExpanded ? <this.Slider/> : null}
      </View>
    )
  }
}