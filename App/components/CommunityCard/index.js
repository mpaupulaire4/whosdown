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
import Button from '../Button';
import RoundButton from '../RoundButton';
// import ChatModal from '../../components/ChatModal';
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
    width: '15%',
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
    position: 'absolute',
    paddingHorizontal: 15,
    paddingVertical: 20,
    left: 0,
    right: 0,
    bottom: 0
  }
})


export default class EventCard extends PureComponent {
  static propTypes = {
    joinEvent: PropTypes.func.isRequired,
    event: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  };
  static defaultProps = {
    event: {},
    actions: true,
    locked: false,
    slim: false,
    chatOpen: false,
    open: false
  };
  sliderHeight = null;
  infoHeight = null;
  state = {
    isExpanded: this.props.open,
    anim: null,
    showModal: false,
    chatOpen: this.props.chatOpen
  };

  componentDidUpdate = async (props, state) => {
    if (this.state.isExpanded !== state.isExpanded) {
      setTimeout(() => {
        const finalValue = !this.state.isExpanded ? 0 : 1
        const startValue = this.state.isExpanded ? 0 : 1
        this.setState({anim: new Animated.Value(startValue)}, () => {
          Animated.timing(
            this.state.anim, {
              toValue: finalValue,
              duration: ANIM_DURATION,
              easing: Easing.linear
            }
          ).start()
        })
      }, 100)
    }
  }

  componentWillReceiveProps = async ({open, locked, chatOpen}) => {
    if (
      typeof open === 'boolean' &&
      typeof locked === 'boolean' &&
      this.state.isExpanded !== open &&
      !locked
    ){
      this.setState({ isExpanded:  !this.state.isExpanded})
    }
    if (this.state.chatOpen !== chatOpen){
      this.setState({ chatOpen })
    }
  }

  componentDidMount = async () => {
    const {open} = this.props;
    if (typeof open === 'boolean' && open){
      this.componentDidUpdate(null, {isExpanded: !open})
    }
  }

  handleSlideToggle = async () => {
    const { onPress, locked, open } = this.props
    onPress && onPress(this.props.event)
    if (locked) {
      return;
    }
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  toggleModal() {
    this.setState({ showModal: false })
  }

  setSliderHeight = ({nativeEvent: {layout}}) => {
    if (!this.sliderHeight ){
      this.sliderHeight = layout.height
    }
  }
  setInfoHeight = ({nativeEvent: {layout}}) => {
    if (this.infoHeight !== layout.height){
      this.infoHeight = layout.height
    }
  }

  toggleChat = () => {
    this.setState({chatOpen: !this.state.chatOpen})
  }

  render() {
    const { isExpanded, sliderHeight, infoHeight, chatOpen } = this.state
    const { event, slim, actions, joinEvent } = this.props
    let eventTime = ''
    let etMoment = moment(event.time)
    let height = null
    let heightI = null
    if (this.state.anim) {
      height = this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [this.infoHeight, this.infoHeight + this.sliderHeight],
      });
      heightI = this.state.anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, this.sliderHeight],
      })
    }
    if (moment().isSame(moment(event.time), 'd')) {
      eventTime = 'Today, '
    } else {
      eventTime = etMoment.format('ddd, MMM D [at] ')
    }
    if (etMoment.minutes() === 0) {
      eventTime += etMoment.format('hA')
    } else {
      eventTime += etMoment.format('h:mm A')
    }
    let eventParticipants = (
      <Animated.View style={[ styles.slideContainer, {height: heightI, opacity: this.state.anim || 0}]} onLayout={this.setSliderHeight}>
        <Icon name="people"  color={background} size={25}/>
        <ParticipantsListing participants={event.participants} />
        {!actions ? null : (
          <View style={[styles.buttonContainer]} >
            <RoundButton color={background} title="I'M DOWN" onPress={joinEvent} height={25}/>
            <RoundButton color={silver()} title="Discussion" onPress={this.toggleChat} textStyle={{color: background}} height={25}/>
          </View>
        )}
      </Animated.View>
    )
    const locationDisplay = isExpanded ? event.location.address : (event.distance ? `${(Math.round((event.distance * 0.621371) * 10) / 10).toPrecision(2)} mi` : false)
    return (
      <Animated.View style={[styles.container, {height: height || null}]} >
        {eventParticipants}
        <TouchableWithoutFeedback onPress={this.handleSlideToggle} onLayout={this.setInfoHeight}>
          <View style={styles.cardContainer} >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{uri: event.image || 'http://s7.orientaltrading.com/is/image/OrientalTrading/VIEWER_IMAGE_400/latex-bright-balloons~13703512'}}/>
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
                  <Text style={styles.detailsText}>{eventTime}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {/* <ChatModal
          show={chatOpen}
          onRequestClose={this.toggleChat}
          conversationID={event.id}
        /> */}
      </Animated.View>
    )
  }
}