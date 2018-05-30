import React, { PureComponent } from 'react';
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

const ChatQuery = graphql`
query ChatQuery($convo_id: ID!) {
  current_user {
    id
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
mutation ChatMutation($message: MessagePost!) {
  post_message(message: $message) {
    id
    owner
    timestamp
    text
  }
}
`

export default class ChatContainer extends PureComponent {
  static propTypes = {
    convo_id: PropTypes.string.isRequired,
    toLogin: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
  }

  current_user = {id: ''}
  convo = {
    id: this.props.convo_id,
    title: '',
    participants: [],
    messages: [],
  }

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
        query={ChatQuery}
        variables={{
          convo_id: this.props.convo_id,
          chat: this.props.show,
        }}
        render={({props, error, retry}) => {
          let loading = false;
          if (props) {
            this.convo = props.conversation || this.convo
            this.current_user = props.current_user
            loading = false
          } else {
            loading = true
          }
          if (error || (props && !props.current_user)) {
            setTimeout(this.props.toLogin, 10);
          }
          return (
            <ChatModal
              show={this.props.show}
              current_user={this.current_user}
              convo={this.convo}
              messages={this.convo.messages}
              onRequestClose={this.props.onRequestClose}
              loading={loading}
              refresh={retry}
              onPostMessage={this.onPostMessage}
            />
          )
        }}
      />
    )
  }
}