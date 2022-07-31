import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View, Platform, SafeAreaView, StatusBar } from 'react-native'
import { Colors } from '../../constants/colors';
import { Place } from '../../models/place';
import { getAddress } from '../../utils/location';
import { CustomButtom } from '../ui/CustomButtom';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';

export const PlaceForm = ({ onCreatePlace }) => {
  const routes = useRoute();
  const [enteredTitle, setEnteredTitle] = useState('');
  const [location, setLocation] = useState();
  const [image, setImage] = useState()

  const changeTitleHandler = (text) => {
    setEnteredTitle(text);
  }

  const takenImageHandler = (image) => {
    setImage(image);
  }

  //UseCallBack?
  const pickLocationHandler = async (location) => {
    let address = "";
    if (location) {
      address = await getAddress(location.lat, location.lng);
    }
    setLocation({ ...location, address });
  }

  const savePlace = async () => {

    const placeData = new Place(enteredTitle, image, location.address, { lat: location.lat, lng: location.lng });
    onCreatePlace(placeData)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} alwaysBounceVertical={true}>
        <View style={styles.label}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
        </View>
        <ImagePicker onImageTaken={takenImageHandler} />
        <LocationPicker onLocationPick={pickLocationHandler} />
        <CustomButtom onPress={savePlace}  >Add Place</CustomButtom>
      </ScrollView>
    </SafeAreaView>

  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100
  }
})