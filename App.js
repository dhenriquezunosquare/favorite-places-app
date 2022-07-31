import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { AllPlaces } from './screens/AllPlaces';
import { AddPlace } from './screens/AddPlace';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from './components/ui/IconButton';
import { Colors } from './constants/colors';
import { Map } from './screens/Map';
import { useEffect, useState } from 'react';
import { init } from './utils/db';
import AppLoading from 'expo-app-loading';
import { PlaceDetails } from './screens/PlaceDetails';
const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(()=>{
      setDbInitialized(true);
    }).catch( (err)=>{
      console.log(err);
    });
  }, [])
  
  if(!dbInitialized){
    return <AppLoading  />
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{backgroundColor:Colors.primary500},
          headerTintColor:Colors.gray700,
          contentStyle:{backgroundColor:Colors.gray700}
        }} >
          <Stack.Screen name="AllPlaces" component={AllPlaces} options={
            ({navigation}) => ({
              title:" Your Favorite Places",
              headerRight: ({ tintColor }) => <IconButton icon="add" color={tintColor} size={24} onPress={() => { navigation.navigate('AddPlace') }} />
            })
          } />
          <Stack.Screen name="AddPlace" component={AddPlace} options={{title:"Add a new place"}} />
          <Stack.Screen name="Map" component={Map} options={{title:"Map"}} />
          <Stack.Screen name="PlaceDetails" component={PlaceDetails} options={{title:"Loading Place..."}} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
