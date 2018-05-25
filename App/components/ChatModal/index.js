import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Platform,
} from 'react-native'
import PropTypes from 'prop-types'
// import ChatsService from '../../services/Chats'
import Gradient from '../Gradient'
import { background, silver } from '../../styles/colors'
import { HeaderBar } from '../HeaderBar'
import Button from '../../components/RoundButton'
import GrowingInput from '../../components/GrowingInput'
import Spacer from 'react-native-keyboard-spacer'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footer: {
    backgroundColor: silver(),
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  downText: {
    backgroundColor: 'transparent',
    color: 'white',
    alignSelf: 'center',
    marginBottom: 5
  },
  input: {
    flex: 1,
    borderColor: 'lightgrey',
    marginRight: 10,
    fontSize: 16
  }
})

export default class ChatModal extends Component {
  static propTypes = {
    show: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onPostMessage: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        owner: PropTypes.string.isRequired,
        timestamp: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]).isRequired
      })
    ).isRequired,
    convo: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      participants: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          display_name: PropTypes.string,
          last_viewed: PropTypes.number.isRequired,
        }).isRequired
      ).isRequired,
    })
  }

  static defaultProps = {
    show: true,
    onRequestClose: () => {},
  }

  participants = {}
  text = ''

  componentWillMount(){
    this.init()
  }

  componentWillReceiveProps(props){
    this.init(props)
  }

  init = (props = this.props) => {
    const { convo } = props;
    this.participants = convo.participants.reduce((obj, user = {}) => ({
      ...obj,
      [user.id]: user,
    }), {})
  }

  submitPost = () => {
    const { convo, onPostMessage } = this.props
    onPostMessage({
      conversation_id: convo.id,
      text: this.text,
    })
    this.input && this.input.clear()
    this.text = ''
  }

  render() {
    const { show, onRequestClose } = this.props
    const { messages, title } = this.state
    const userId = '';
    let lastOwner = null;
    let downText = null
    let footerContent = (
      <View style={styles.footerContent}>
        <GrowingInput style={styles.input} placeholder="...MESSAGE" onChangeText={(text) => this.text = text} ref={(r) => this.input = r}/>
        <Button title="Send" textStyle={{fontSize: 16}} width={75} onPress={this.submitPost}/>
      </View>
    )
    if (!this.participants[userId]) {
      downText = <Text style={styles.downText}>Say you’re down to join the discussion</Text>
      footerContent = <Button title="I'm Down!"/>
    }
    return (
      <Modal visible={show} onRequestClose={onRequestClose} animationType="slide">
        <Gradient style={styles.container}>
          <HeaderBar title={title} navBack={onRequestClose} margin={Platform.OS !== 'android'}/>
          <ScrollView contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 20}} ref={(r) => r && r.scrollToEnd() }>
            {messages.map(({text, displayName, photoURL, owner}, index) => {
              let user = null;
              if (lastOwner !== owner) {
                user = this.participants[userId]
                lastOwner = owner
              }
              return <MessageBuuble text={text} key={index} user={user} right={ owner === userId }/>
            })}
          </ScrollView>
          {downText}
          <View style={styles.footer}>
            {footerContent}
          </View>
          { Platform.OS === 'ios' ? <Spacer /> :  null}
        </Gradient>
      </Modal>
    );
  }
}

const bubbleStyles = StyleSheet.create({
  userRow: {
    flexDirection: right ? 'row-reverse' : 'row',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 10
  },
  userImage: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    alignSelf: right ? "flex-end" :'flex-start',
  },
  username: {
    backgroundColor: 'transparent',
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 10,
  },
  textBox: {
    backgroundColor: silver(),
    marginHorizontal: 20,
    padding: 10,
    maxWidth: '90%',
    borderRadius: 10,
    marginBottom: 1,
    minWidth: 5,
    alignSelf: right ? "flex-end" :'flex-start',
  },
  text: {
    color: background,
    fontSize: 16,
    backgroundColor: 'transparent'
  }
})

function MessageBuuble({ user, text, right }){
  return (
    <View>
      { user ?  (
        <View style={bubbleStyles.userRow}>
          <Text style={bubbleStyles.username}>{user.display_name}</Text>
        </View>
      ) : null}
      <View style={bubbleStyles.textBox} >
        <Text style={bubbleStyles.text} selectable>{text}</Text>
      </View>
    </View>
  )
}