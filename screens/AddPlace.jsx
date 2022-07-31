import { useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PlaceForm } from '../components/places/PlaceForm'
import { insertPlace } from '../utils/db'

export const AddPlace = () => {
  const navigation = useNavigation();
  const createPlaceHandler = async (placeData) => {
    await insertPlace(placeData);
    navigation.navigate("AllPlaces")
  };
  return (
    <PlaceForm onCreatePlace ={createPlaceHandler} />
  )
}


const styles = StyleSheet.create({})