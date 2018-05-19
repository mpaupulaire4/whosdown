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
  static defaultProps = {
    show: true,
    onRequestClose: () => {},
  }

  state = {
    participants: {},
    title: '',
    messages: []
  }

  componentWillMount(){
    this.init()
  }

  componentWillReceiveProps(props){
    this.init(props)
  }

  init = (props = this.props) => {
    const { conversationID } = props
    if (!conversationID) {
      return
    }
    // ChatsService.getConversationById(conversationID).then(({messages, ...convo}) => {
    //   if (!convo){
    //     return
    //   }
    //   this.setState({...convo})
    // })
    // ChatsService.watchMessagesById(conversationID, (messages) => {
    //   if (!messages){
    //     return
    //   }
    //   this.setState({messages: Object.values(messages || {}) })
    // })
  }

  submitPost = () => {
    const { conversationID } = this.props
    // ChatsService.postMessage(conversationID, {text: this.text}).then(() => {
    //   this.input && this.input.clear()
    //   this.text = ''
    // })
  }

  render() {
    const { show, onRequestClose } = this.props
    const userId = '';
    const { messages, title, participants } = this.state
    let lastOwner = null;
    let downText = null
    let footerContent = (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <GrowingInput style={styles.input} placeholder="...MESSAGE" onChangeText={(text) => this.text = text} ref={(r) => this.input = r}/>
        <Button title="Send" textStyle={{fontSize: 16}} width={75} onPress={this.submitPost}/>
      </View>
    )
    if (!participants[userId]) {
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
                user = participants[userId]
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

function MessageBuuble(props){
  const { user, text, right } = props
  const style = StyleSheet.create({
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
  return (
    <View>
      { user ?  (
        <View style={style.userRow}>
          <Image style={style.userImage} source={{uri: user.photoURL}} />
          <Text style={style.username}>{user.displayName}</Text>
        </View>
      ) : null}
      <View style={style.textBox} >
        <Text style={style.text} selectable>{text}</Text>
      </View>
    </View>
  )
}