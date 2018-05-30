import React, { Component } from 'react';
import {
  AsyncStorage,
} from 'react-native'
import {
  graphql,
  QueryRenderer,
  commitMutation,
} from 'react-relay';
import PropTypes from 'prop-types';
import env from '../../Data'
import ChatModal from '../../components/ChatModal'
import EventDetails from './EventDetails'

const EventDetailsQuery = graphql`
query EventDetailsQuery($id: ID!, $convo_id: ID!) {
  current_user {
    id
  }
  event(id: $id) {
    id
    title
    description
    time
    convo_id
    location {
      address
      latitude
      longitude
    }
    participants {
      id
      display_name
    }
  }
  conversation(id: $convo_id) {
    id
    title
    messages {
      id
      owner
      timestamp
      text
    }
    participants {
      id
      display_name
      last_viewed
    }
  }
}
`
const PostMessageMutation = graphql`
mutation EventDetailsMutation($message: MessagePost!) {
  post_message(message: $message) {
    id
    owner
    timestamp
    text
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

  state = {
    chat: false,
  }

  event = this.props.navigation.getParam('event', {})
  current_user = {id: ''}
  convo = {
    id: '',
    title: '',
    participants: [],
    messages: [],
  }

  back = () => this.props.navigation.goBack()

  toggleChat = () => this.setState({chat: !this.state.chat})

  onPostMessage = ({
    text,
  }) => {
    commitMutation(
      env,
      {
        mutation: PostMessageMutation,
        variables: {
          message: {
            text,
            convo_id: this.convo.id,
          },
        },
        updater: (store) => {
          const payload = store.getRootField('post_message')
          const conversation = store.getRoot().getLinkedRecord('conversation', {
            id: this.convo.id
          })
          const messages = conversation.getLinkedRecords('messages')
          const message = store.get(payload.getDataID())
          conversation.setLinkedRecords([message, ...messages], 'messages')
        },
      }
    )
  }

  render() {
    return (
      <QueryRenderer
        environment={env}
        query={EventDetailsQuery}
        variables={{
          id: this.event.id,
          convo_id: this.event.convo_id,
          chat: this.state.chat,
        }}
        render={({props, error, retry}) => {
          let loading = false;
          if (props) {
            this.event = props.event
            this.convo = props.conversation
            this.current_user = props.current_user
            loading = false
          } else {
            loading = true
          }
          if (error || (props && !props.current_user)) {
            setTimeout(() => {
              this.props.navigation.navigate('Login');
            }, 10);
          }
          return (
            <React.Fragment>
              <EventDetails
                onBack={this.back}
                event={this.event}
                onDiscussion={this.toggleChat}
              />
              <ChatModal
                show={this.state.chat}
                current_user={this.current_user}
                convo={this.convo}
                messages={this.convo.messages}
                onRequestClose={this.toggleChat}
                loading={loading}
                refresh={retry}
                onPostMessage={this.onPostMessage}
              />
            </React.Fragment>
          )
        }}
      />
    )
  }
}