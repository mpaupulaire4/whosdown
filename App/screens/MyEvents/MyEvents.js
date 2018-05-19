import React, { Component } from 'react';
import {
  View,
  FlatList,
  Animated,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import Gradient from '../../components/Gradient';
import CommunityCard from '../../components/CommunityCard'
import BinaryButton from '../../components/BinaryButton';

const styles = {
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'red',
    paddingTop: 50,
    paddingHorizontal: 15
  },
  scrollContainer: {
    marginVertical: 15,
  }
}
const TABS = ['HOSTING', 'PARTICIPATING'];
const EventProptype = {
  id: PropTypes.string,
}
export default class MyEvents extends Component {
  static propTypes = {
    hostedEvents: PropTypes.arrayOf(
      PropTypes.shape(EventProptype)
    ).isRequired,
    participatingEvents: PropTypes.arrayOf(
      PropTypes.shape(EventProptype)
    ).isRequired
  }

  state = {
    selected: TABS[0],
  }

  // componentWillMount() {
  //   EventsService.getUserHostedEvents().then((hostedEvents) => {
  //     this.setState({ hostedEvents })
  //   })
  // }
  handlePress = (event) => {
    const { navigate } = this.props.navigation
    // EventsService.getEventById(event.id).then((newEvent) => {
    //   navigate('EventDetails', { event: newEvent })
    // })
  }
  handleToggle = (option) => {
    this.setState({
      selected: option,
    })
  }

  _keyExtractor = (item) => item.id;

  renderCard = (event) => (
    <CommunityCard
      event={event}
    />
  )


  render() {
    const {hostedEvents, participatingEvents} = this.props
    return (
      <View style={styles.rowContainer}>
        <Gradient style={styles.container}>
          <BinaryButton onTabChange={this.handleToggle} options={TABS} />
          <FlatList
            data={this.state.selected === TABS[0] ? hostedEvents : participatingEvents}
            keyExtractor={this._keyExtractor}
            renderItem={this.renderCard}
            style={styles.scrollContainer}
          />
        </Gradient>
      </View>
    )
  }
}