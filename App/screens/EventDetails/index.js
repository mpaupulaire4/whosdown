import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native'
import { graphql, QueryRenderer } from 'react-relay';
import PropTypes from 'prop-types';
import env from '../../Data'
import EventDetails from './EventDetails'

const EventDetailsQuery = graphql`
query EventDetailsQuery($id: ID!) {
  event(id: $id) {
    id
    title
    description
    time
    location {
      address
      latitude
      longitude
    }
  }
}
`

export default class EventDetailsContainer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  }

  event = this.props.navigation.getParam('event', {})

  back = () => this.props.navigation.goBack()

  render() {
    return (
      <QueryRenderer
        environment={env}
        query={EventDetailsQuery}
        variables={{
          id: this.event.id,
        }}
        render={({props, error, retry}) => {
          let loading = false;
          if (props) {
            this.event = props.event
            loading = false
          } else {
            loading = true
          }
          if (error) {
            setTimeout(() => {
              this.props.navigation.navigate('Login');
            }, 10);
          }
          return (
            <EventDetails
              onBack={this.back}
              event={this.event}
            />
          )
        }}
      />
    )
  }
}