import React,  { Component } from 'react'
import {
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native'

const styles = StyleSheet.create({
  list:{
    position: 'absolute',
    left: 0,
    right: 0,
  },
  listItem:{
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
  },
  main: {

  },
  second: {
    color: 'grey',
    fontSize: 9,
  }
})

export default class LocationInput extends Component {
  static propTypes = {

  }

  state = {
    places: [],
    value: this.props.defaultValue,
  }

  onBlur = (...args) => {
    const { onBlur } = this.props
    onBlur && onBlur(...args)
    this.setState({
      places: []
    })
  }

  onChangeText = (value) => {
    this.setState({
      value,
    })
    const { onChangeText } = this.props;
    onChangeText && onChangeText(value)
    if (value.length < 3)
      return
    fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${'AIzaSyD1Nk6oA7ig6g8LSU_o1wl1hibowZqTiw8'}&input=${value}`)
      .then((res) => {
      return res.json()
    }).then((res) => {
      this.setState({
        places: res.predictions,
      })
    })
  }

  onSelect = (place) => {
    this.setState({
      value: place.description,
      places: [],
    })
    this.input.blur()
    const { onPlaceSelected } = this.props
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${'AIzaSyD1Nk6oA7ig6g8LSU_o1wl1hibowZqTiw8'}&placeid=${place.place_id}`)
      .then((res) => {
      return res.json()
    }).then((res) => {
      onPlaceSelected && onPlaceSelected(res)
    })
  }

  render() {
    const { places, value } = this.state
    return (
      <View>
        <TextInput
          {...this.props}
          ref={(r) => this.input = r}
          value={value}
          onChangeText={this.onChangeText}
          onBlur={this.onBlur}
        />
        <View>
          <View
            style={styles.list}
          >
            {places.map((place) => {
              return (
                <TouchableWithoutFeedback
                  key={place.id}
                  onPress={() => this.onSelect(place)}
                >
                  <View style={styles.listItem} >
                    <Text style={styles.main} >
                      {place.structured_formatting.main_text}
                    </Text>
                    <Text style={styles.second} >
                      {place.structured_formatting.secondary_text}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

}