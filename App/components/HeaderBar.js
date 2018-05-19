import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform
} from 'react-native'
import { silver, background } from '../styles/colors'
import Icon from 'react-native-vector-icons/Ionicons';

const MARGIN = 20;
const styles = StyleSheet.create({
  titleText: {
    color: background,
    fontSize: 30,
    textAlign: 'center',
  },
  headerContainer: {
    shadowOffset: {
      height: 5
    },
    shadowOpacity: 0.2,
    shadowColor: 'black',
    paddingTop: MARGIN,
    height: 50 + MARGIN,
    backgroundColor: silver(),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer:{
    height: 50,
    width: 50,
    justifyContent:'center',
    alignItems: 'center',
  },
  icon:{
    padding: 0,
    margin: 0
  }
});
export default function HeaderBar({navBack, title, margin = true, right}) {
  return (
    <View style={[styles.headerContainer, !margin ? {paddingTop: 0, height: 50} : {}]} >
      <TouchableOpacity style={styles.buttonContainer} onPress={navBack}>
        <Icon name='ios-arrow-back' size={35} color={background} style={styles.icon}/>
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => {}}>
        {right}
      </TouchableOpacity>
    </View>
  )
}