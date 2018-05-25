import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native'
import { graphql, QueryRenderer } from 'react-relay';
import PropTypes from 'prop-types';
import env from '../../Data'
import { WHOSDOWN_TOKEN_KEY } from '../../constants'
import Profile from './Profile'


const ProfileQuery = graphql`
  query ProfileQuery {
    current_user {
      id
      display_name
      email
      photo_url
    }
  }
`

export default class ProfileContainer extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  user = {}

  logout = async () => {
    await AsyncStorage.removeItem(WHOSDOWN_TOKEN_KEY)
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <QueryRenderer
        environment={env}
        query={ProfileQuery}
        render={({props, error, retry}) => {
          if (error) {
            setTimeout(() => {
              this.props.navigation.navigate('Login');
            }, 10);
          } else if (props && props.current_user) {
            this.user = props.current_user
          }
          return <Profile user={this.user} onLogout={this.logout}/>
        }}
      />
    )
  }
}