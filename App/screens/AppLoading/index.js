/**
 * @flow
 */

import React, { Component } from 'react';
import { graphql, QueryRenderer } from 'react-relay';
import PropTypes from 'prop-types';
import Gradient from '../../components/Gradient';
import env from '../../Data'

/* ::
  type Props = {};
*/

export default class AppLoading extends Component/* :: <Props> */ {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  render = () => {
    return (
      <QueryRenderer
        environment={env}
        query={graphql`
          query AppLoadingQuery {
            current_user {
              id
            }
          }
        `}
        render={({error, props}) => {
          if (error || (props && !props.current_user)) {
            setTimeout(() => {
              this.props.navigation.navigate('Login');
            }, 10);
          }
          if (props && props.current_user) {
            setTimeout(() => {
              this.props.navigation.navigate('AppMain');
            }, 10);
          }
          return (<Gradient style={{flex: 1}}/>);
        }}
      />
    )
    return
  };
}

