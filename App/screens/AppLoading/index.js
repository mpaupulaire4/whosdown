/**
 * @flow
 */

import React, { Component } from 'react';
import { graphql, fetchQuery } from 'react-relay';
import PropTypes from 'prop-types';
import Gradient from '../../components/Gradient';
import env from '../../Data'

/* ::
  type Props = {};
*/

const AppLoadingQuery = graphql`
query AppLoadingQuery {
  current_user {
    id
  }
}
`

export default class AppLoading extends Component/* :: <Props> */ {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  async componentWillMount() {
    return fetchQuery(env,AppLoadingQuery).then((data = {}) => {
      if (data.current_user) {
        this.props.navigation.navigate('AppMain');
      } else {
        this.props.navigation.navigate('Login');
      }
    }).catch((e) => {
      this.props.navigation.navigate('Login');
    })
  }

  render() {
    // ADD YOUR APP LOADING SCREEN HERE (LIKE DISMISSING THE SPLASH AND SUCH)
    return (
      <Gradient style={{flex: 1}}/>
    )
  };
}

