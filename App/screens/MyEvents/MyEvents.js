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
const EventPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
})
export default class MyEvents extends Component {
  static propTypes = {
    hostedEvents: PropTypes.arrayOf(
      EventPropType
    ).isRequired,
    participatingEvents: PropTypes.arrayOf(
      EventPropType
    ).isRequired,
    onEventPress: PropTypes.func.isRequired,
  }

  state = {
    selected: TABS[0],
  }

  eventPressed = (event) => {
    const { onEventPress } = this.props
    onEventPress(event);
  }

  handleToggle = (option) => {
    this.setState({
      selected: option,
    })
  }

  _keyExtractor = (item) => item.id;

  renderCard = ({ item }) => (
    <CommunityCard
      event={item}
      onPress={this.props.onEventPress}
      slim={true}
      locked={true}
    />
  )


  render() {
    const { hostedEvents, participatingEvents } = this.props
    const { selected } = this.state
    return (
      <View style={styles.rowContainer}>
        <Gradient style={styles.container}>
          <BinaryButton
            onTabChange={this.handleToggle}
            options={TABS}
            selected={selected}
          />
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