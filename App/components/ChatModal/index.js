import React, { Component } from 'react'
import {
  Modal,
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  Platform,
} from 'react-native'
import PropTypes from 'prop-types'
// import ChatsService from '../../services/Chats'
import Gradient from '../Gradient'
import { background, silver } from '../../styles/colors'
import HeaderBar from '../HeaderBar'
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
    loading: PropTypes.bool,
    onRequestClose: PropTypes.func,
    refresh: PropTypes.func,
    onPostMessage: PropTypes.func.isRequired,
    current_user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
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
          last_viewed: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
          ]).isRequired,
        }).isRequired
      ).isRequired,
    })
  }

  static defaultProps = {
    show: true,
    onRequestClose: () => {},
  }

  participants = {}
  state = {
    text: '',
  }

  componentWillMount(){
    this.init()
  }

  componentWillReceiveProps(props){
    this.init(props)
  }

  init = (props = this.props) => {
    const { convo, messages } = props;
    this.participants = convo.participants.reduce((obj, user = {}) => ({
      ...obj,
      [user.id]: user,
    }), {});
    this.lastOwner = null;
  }

  submitPost = () => {
    const { convo, onPostMessage } = this.props
    onPostMessage({
      text: this.state.text,
    })
    this.setState({text: ''})
  }

  _renderItem = ({ item: {text, id, owner}}) => {
    const { current_user } = this.props
    let user = null;
    if (this.lastOwner !== owner) {
      user = this.participants[current_user.id]
      this.lastOwner = owner
    }
    return (
      <MessageBuuble
        key={id}
        text={text}
        user={user}
        right={ owner === current_user.id }
      />
    )
  }

  render() {
    const {
      show,
      onRequestClose,
      messages,
      convo,
      refresh,
      loading,
      current_user,
    } = this.props
    let downText = null;
    let footerContent = (
      <View style={styles.footerContent}>
        <GrowingInput
          style={styles.input}
          value={this.state.text}
          placeholder="...MESSAGE"
          onChangeText={(text) => this.setState({text})}
        />
        <Button title="Send" textStyle={{fontSize: 16}} width={75} onPress={this.submitPost}/>
      </View>
    )
    if (!this.participants[current_user.id]) {
      downText = <Text style={styles.downText}>Say you’re down to join the discussion</Text>
      footerContent = <Button title="I'm Down!"/>
    }
    return (
      <Modal visible={show} onRequestClose={onRequestClose} animationType="slide">
        <Gradient style={styles.container}>
          <HeaderBar
            title={convo.title}
            onBack={onRequestClose}
            margin={Platform.OS !== 'android'}
          />
          <FlatList
            keyExtractor={(item) => item.id}
            inverted={true}
            data={messages}
            refreshing={loading}
            onRefresh={refresh}
            renderItem={this._renderItem}
          />
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
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 5,
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
      <View style={[bubbleStyles.textBox, {
        alignSelf: right ? "flex-end" :'flex-start',
      }]} >
        <Text style={bubbleStyles.text} selectable>{text}</Text>
      </View>
      { user ?  (
          <View style={[bubbleStyles.userRow, {
            flexDirection: right ? 'row-reverse' : 'row',
          }]}>
            <Text style={bubbleStyles.username}>{user.display_name}</Text>
          </View>
        ) : null}
    </View>
  )
}