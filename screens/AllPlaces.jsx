import { useIsFocused, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { PlacesList } from '../components/places/PlacesList'
import { fecthPlaces } from '../utils/db'



export const AllPlaces = () => {
  const route = useRoute();
  const [loadedPlaces, setLoadedPlaces] = useState([])

  const isFocused = useIsFocused();

  const getPlaces = async () => {
    const data = await fecthPlaces();
    setLoadedPlaces(data);
  }

  useEffect(() => {
    if (isFocused) {

      //setLoadedPlaces(prev=> [...prev,route.params?.place])
      getPlaces();
    }
  }, [isFocused])



  return (
    <PlacesList places={loadedPlaces} />
  )
}


const styles = StyleSheet.create({

});