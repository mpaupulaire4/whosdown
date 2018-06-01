/**
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  graphql,
  commitMutation,
} from 'react-relay'
import env from '../../Data'
import EditEvent from './EditEvent'


/* ::
  type Props = {};
*/

const CreateEventMutaion = graphql`
mutation EditEventCreateMutation ($event: EventCreateInput! ) {
  create_event(event: $event) {
    id
  }
}
`

const UpdateEventMutaion = graphql`
mutation EditEventUpdateMutation ($event: EventUpdateInput! ) {
  update_event(event: $event) {
    id
  }
}
`

export default class EditEventContainer extends Component/* :: <Props> */ {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      getParam: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  }
  back = () => this.props.navigation.goBack()

  onCreateEvent = (event) => {
    commitMutation(
      env,
      {
        mutation: CreateEventMutaion,
        variables: {
          event,
        },
        onCompleted: () => this.props.navigation.navigate('MyEvents'),
        // updater: (store) => {
        //   const payload = store.getRootField('post_message')
        //   const conversation = store.getRoot().getLinkedRecord('conversation', {
        //     id: this.convo.id
        //   })
        //   const messages = conversation.getLinkedRecords('messages')
        //   const message = store.get(payload.getDataID())
        //   conversation.setLinkedRecords([message, ...messages], 'messages')
        // },
      }
    )
  }

  onUpdateEvent = (event) => {
    commitMutation(
      env,
      {
        mutation: UpdateEventMutaion,
        variables: {
          event,
        },
        onCompleted: () => this.props.navigation.navigate('MyEvents'),
        // updater: (store) => {
        //   const payload = store.getRootField('post_message')
        //   const conversation = store.getRoot().getLinkedRecord('conversation', {
        //     id: this.convo.id
        //   })
        //   const messages = conversation.getLinkedRecords('messages')
        //   const message = store.get(payload.getDataID())
        //   conversation.setLinkedRecords([message, ...messages], 'messages')
        // },
      }
    )
  }

  render() {
    const { navigation } = this.props
    const event = navigation.getParam('event', {})
    return (
      <EditEvent
        event={event}
        onSave={event.id ? this.onUpdateEvent : this.onCreateEvent}
        onBack={this.back}
      />
    );
  }
}
