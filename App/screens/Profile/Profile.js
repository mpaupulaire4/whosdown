import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import Gradient from '../../components/Gradient';
import Button from '../../components/Button';
import { background, highlight1, highlight4, highlight3, highlight2 } from '../../styles/colors';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 50,
    alignItems: 'center',
    flex: 1,
    padding: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'green',

  },
  infoText:{
    fontSize: 22,
  }
})

export default class Profile extends PureComponent {
  static propTypes = {
    user: PropTypes.shape({
      photo_url: PropTypes.string.isRequired,
      display_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    onLogout: PropTypes.func.isRequired,
  }
  render() {
    const { onLogout, user } = this.props
    return (
      <View style={styles.container} >
        <Image source={{ uri: user.photo_url }} style={styles.photo} />
        <Text style={styles.infoText}>{user.display_name}</Text>
        <Text style={styles.infoText}> {user.email}</Text>
        <Button backgroundColor={highlight1} title="Logout" onPress={onLogout}/>
      </View>
    )
  }
}