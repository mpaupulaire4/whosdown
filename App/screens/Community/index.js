import React, { Component } from 'react';
import {
  PermissionsAndroid,
  Platform,
} from 'react-native'
import { graphql, QueryRenderer } from 'react-relay'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import env from '../../Data'
import Community from './Community'


const CommunityQuery = graphql`
  query CommunityQuery(
    $view: VIEW
    $location: LocationInput!
  )  {
    events: events_by_location(
      location: $location,
      view: $view
    ) {
      id
      title
      description
      time
      host {
        id
        display_name
        photo_url
      }
      location {
        address
        latitude
        longitude
      }
      participants {
        id
        display_name
        photo_url
      }
      visibility
    }
  }
`

export default class CommunityContainer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }
  state = {
    filter: Map({
      view: 'PUBLIC',
      location: Map({
        latitude: 0,
        longitude: 0
      })
    })
  }
  events = []
  watchID = null

  async componentWillMount() {
    let granted = true;
    if (Platform.OS === 'android') {
      try {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            'title': 'Whosdown Location Permission',
            'message': 'Whosdown needs access to your location to find evets near you.'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          granted = true
          console.log("You can use location")
        } else {
          granted = false
          console.log("location denied")
        }
      } catch (err) {
        granted = false
        console.log('Droid Permision Error', err)
      }
    }
    if (granted) {
      this.watchID = navigator.geolocation.watchPosition(
        this.locationSuccess,
        null,
        {
          maximumAge: 1000 * 60 * 60, // 1 hour
          enableHighAccuracy: false,
          distanceFilter: 8045, // ~ 5 milex
          useSignificantChanges: true,
        },
      )
    }
  }

  async componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID);
  }

  locationSuccess = ({coords: { latitude, longitude }}) => {
    this.setState({
      filter: this.state.filter
        .setIn(['location', 'latitude'], latitude)
        .setIn(['location', 'longitude'], longitude)
    })
  }

  onFilterChange = (key, value) => {
    this.setState({
      filter: this.state.filter.set(key, value)
    })
  }

  onCreate = () => {
    this.props.navigation.navigate('CreateEvent')
  }

  render = () => {
    return (
      <QueryRenderer
        environment={env}
        query={CommunityQuery}
        variables={this.state.filter.toJS()}
        render={({props, error, retry}) => {
          let loading = true
          if (error) {
            setTimeout(() => {
              this.props.navigation.navigate('Login');
            }, 10);
          }
          if (!props) {
            loading = true
          }
          if (props) {
            loading = false
            this.events = props.events
          }
          return (
            <Community
              events={this.events}
              filters={this.state.filter.toJS()}
              loading={loading}
              onCreate={this.onCreate}
              onFilterChange={this.onFilterChange}
              onRefresh={retry}
            />
          )
        }}
      />
    )
  }
}