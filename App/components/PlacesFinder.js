import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
} from 'react-native';
import React, { Component, PropTypes } from 'react';
import Button from './Button'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Constants } from  'expo';
import Maps from '../services/Maps';

export default class Geo extends Component {
  static defaultProps = {
    onChange: ()=>{}
  }
  constructor(props){
    super(props)
    this.state={
      showModal:false,
      address: this.props.defaultAddress || this.props.placeholder
    }
    this.handleCancelPress = this.handleCancelPress.bind(this)
    this.handleAddressObject = this.handleAddressObject.bind(this)
  }
  styles = StyleSheet.create({
    container:{
      flex:1,
      flexDirection:'column',
      justifyContent:'flex-start',
      paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight : 0,
    },
    cancelText:{
      fontSize:25,
      color:'white',
    },
    modal: {
      backgroundColor: 'white',
      flex: 1,
    }
  });
  handleCancelPress(){
    this.setState({showModal:false})
  }

  handleAddressObject(data,details=null){
    let address = Maps.getAddress(details)
    this.props.onChange(address)
    this.setState({showModal:false,address:address.address})
  }

  render(){
      let mapModal= (
      <Modal visible={this.state.showModal} onRequestClose={() => this.setState({showModal: false})} transparent={true}>
        <View style={this.styles.container}>
          <View style={this.styles.modal}>
            <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={2} // minimum length of text to search
              autoFocus={false}
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              renderDescription={(row) => row.description} // custom description render
              onPress={this.handleAddressObject}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: 'AIzaSyAHkCZzce7I-rJo8NHZ86qI4oRpYFeVdGc',
                language: 'en', // language of the results
                types: 'geocode', // default: 'geocode'
              }}
              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
              currentLocationLabel="Current location"
              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
              }}


              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities


              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 200ms.
            />
            <Button backgroundColor="#003056" onPress={this.handleCancelPress} title="CANCEL"/>
          </View>
        </View>
      </Modal>
      )
    return (
      <View>
        {mapModal}
        <Text numberOfLines={1} ellipsizeMode='tail' style={[this.props.style]} onPress={()=>this.setState({showModal:true})}>{this.state.address}</Text>
      </View>
    );
  }
}
