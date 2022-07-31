import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { OutlineButton } from '../components/ui/OutlineButton';
import { Colors } from '../constants/colors';
import { fecthPlacesbyID } from '../utils/db';

export const PlaceDetails = ({route,navigation}) => {

  const [place, setPlace] = useState();

  const selectPlaceid = route.params.placeId;

  const handleViewMap = () => {

    console.log(place);
    navigation.navigate("Map",{
      initialLat:place.lat,
      initialLng:place.lng
    })
  }

  useEffect(() => {

    async function loadPlaceData() {
      const data = await fecthPlacesbyID(selectPlaceid);
      setPlace(data);
        navigation.setOptions({
          title: data.title
        })
    }
    loadPlaceData();

  }, [selectPlaceid])


  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading Data</Text>
      </View>
    )
  }

  return (
    <ScrollView >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address} >{place.address}</Text>
        </View>
        <OutlineButton icon="map" onPress={handleViewMap} > View on Map</OutlineButton>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  screen: {
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }
});