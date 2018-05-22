import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native'
import { graphql, QueryRenderer } from 'react-relay';
import PropTypes from 'prop-types';
import env from '../../Data'
import MyEvents from './MyEvents'

const MyEventsQuery = graphql`
query MyEventsQuery($hostedFilter: EventSearchInput, $particFilter: EventSearchInput) {
  hostedEvents: events(filter: $hostedFilter) {
    id
    title
    description
    time
    host {
      id
      display_name
    }
    participants {
      id
      display_name
    }
    location {
      address
      latitude
      longitude
    }
    visibility
  }
  participatingEvents: events(filter: $particFilter) {
    id
    title
    description
    time
    host {
      id
      display_name
    }
    participants {
      id
      display_name
    }
    location {
      address
      latitude
      longitude
    }
    visibility
  }
}
`

export default class MyEventsContainer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  data = {
    hostedEvents: [],
    participatingEvents: [],
  }

  navToEventDetail = (event) => {
    this.props.navigation.navigate('EventDetail', { event })
  }

  render() {
    return (
      <QueryRenderer
        environment={env}
        query={MyEventsQuery}
        variables={{
          hostedFilter: {
            host: 'users/525716',
          },
          particFilter: {
            participants: ['users/525716'],
          },
        }}
        render={({props, error, retry}) => {
          if (props) {
            this.data = props
          }
          if (error) {
            setTimeout(() => {
              this.props.navigation.navigate('Login');
            }, 10);
          }
          return <MyEvents
            participatingEvents={this.data.participatingEvents}
            hostedEvents={this.data.hostedEvents}
            onEventPress={this.navToEventDetail}
          />
        }}
      />
    )
  }
}