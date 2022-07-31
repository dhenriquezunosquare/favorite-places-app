import React, { useEffect, useState } from 'react'
import { Alert, Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { OutlineButton } from '../ui/OutlineButton'
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from 'expo-location';
import { getMapPreview } from '../../utils/location';
import { useNavigation, useRoute } from '@react-navigation/native';

export const LocationPicker = ({ onLocationPick }) => {
    const routes = useRoute();

    const navigation = useNavigation();


    const [pickedLocation, setPickedLocation] = useState();
    const [status, requestPermission] = useForegroundPermissions();

    let route_location = (routes.params?.selectedLocation) || null;

    useEffect(() => {
        if (route_location) {
            setPickedLocation({ lat: route_location.lat, lng: route_location.lng });
            onLocationPick({ lat: route_location.lat, lng: route_location.lng });
        }
    }, [route_location])



    const verifyPermissions = async () => {
        if (status.status === PermissionStatus.UNDETERMINED) {
            const persmissionsResponse = await requestPermission();
            return persmissionsResponse.granted;
        }
        if (status.status === PermissionStatus.DENIED) {
            Alert.alert('Permission Error', 'You need to grant location permissions to use this app');
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;

        const location = await getCurrentPositionAsync(); //
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });

        onLocationPick({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        });


    }

    const PickMapHandler = () => {
        navigation.navigate("Map");

    }

    let locationPreview = <Text>No location picked yet</Text>

    if (pickedLocation) {
        locationPreview = (
            <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
        )
    }


    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlineButton icon="location" onPress={getLocationHandler} >Locate User</OutlineButton>
                <OutlineButton icon="map" onPress={PickMapHandler} >Pick on Map</OutlineButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        zIndex: 0
    }
})