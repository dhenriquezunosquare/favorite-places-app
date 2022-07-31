import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { Alert, StyleSheet, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { IconButton } from '../components/ui/IconButton'

export const Map = () => {
  const navigation = useNavigation();

  const route = useRoute();

  const initalLocation = route.params && {lat:route.params?.initialLat, lng: route.params?.initialLng};

  const [selectedLocation, setSelectedLocation] = useState(initalLocation);

  const region = {
    latitude: initalLocation ? initalLocation.lat : 10.96854,
    longitude: initalLocation ? initalLocation.lng : -74.78132,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const selectLocationHandle = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat, lng })
  }

  const savePickedLocationHandler = useCallback(() =>{
    if(!selectedLocation) {
      Alert.alert("No location picked!","You have to pick a location")
      return;
    }

    navigation.navigate("AddPlace",{
      selectedLocation
    })
    
  },[navigation,selectedLocation]);


  useLayoutEffect(() => {
    if(initalLocation){
      return ;
    }
    navigation.setOptions({
      headerRight: ({ tintColor }) => <IconButton icon="save" color={tintColor} size={24} onPress={savePickedLocationHandler} />
    })
  }, [navigation,savePickedLocationHandler,initalLocation])

  return (
    <MapView 
    loadingEnabled = {true}
    loadingIndicatorColor="#666666"
    loadingBackgroundColor="#eeeeee"
    moveOnMarkerPress = {false}
    showsUserLocation={true}
    showsCompass={true}
    showsPointsOfInterest = {false}
    provider="google"  style={styles.map} onPress={selectLocationHandle} initialRegion={region}>
      {
        selectedLocation && 
        <Marker coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} pinColor="blue" title='PickedLocation' />
      }

    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
})
