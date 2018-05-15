import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
  Linking
} from 'react-native'
import { MapView } from 'expo';
import Button from './Button'

function openDirections(latitude, longitude) {
    Platform.select({
        ios: () => {
            Linking.openURL('http://maps.apple.com/maps?daddr=' + latitude + ',' + longitude);
        },
        android: () => {
            Linking.openURL('http://maps.google.com/maps?daddr=' + latitude + ',' + longitude);
        }
    })();
}
export default class MapModal extends Component {
  constructor(props) {
    super(props)
  }
  styles = StyleSheet.create({
    mapView: {
      flex: 1,
      borderRadius: 5,
      padding: 15,
    },
    container: {
      padding: 15,
      paddingTop: 25,
      flex:1,
      flexDirection: 'column'
    },
    buttonContainer: {
      marginVertical: 10,
      overflow: 'hidden'
    },
  })
  render() {
    let { event } = this.props
    let { location } = event
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.modalVisible}
        onRequestClose={() => { this.props.closeModal }}
      >
        <View style={this.styles.container}>
          <MapView
            style={this.styles.mapView}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: .02,
              longitudeDelta: .02,

            }}
          >
            <MapView.Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title={event.title}
              description={location.address}
              onCalloutPress={()=>{this.props.closeModal();openDirections(location.latitude,location.longitude)}}
              ref={(c)=>{if(c)c.showCallout()}}
            />
          </MapView>
        </View>
        <View style={[this.styles.buttonContainer]} >
          <Button backgroundColor="#003056" title="BACK" onPress={this.props.closeModal} />
        </View>
      </Modal>
    )
  }
}