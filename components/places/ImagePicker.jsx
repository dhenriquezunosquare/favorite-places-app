import React, { useState } from 'react'
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import { OutlineButton } from '../ui/OutlineButton';

export const ImagePicker = ({onImageTaken}) => {
    const [img, setImg] = useState();
    const [status, requestPermission] = useCameraPermissions();
    const verifyPermissions = async () => {
        if (status.status === PermissionStatus.UNDETERMINED) {
            const persmissionsResponse = await requestPermission();
            return persmissionsResponse.granted;
        }
        if (status.status === PermissionStatus.DENIED) {
            Alert.alert('Permission Error', 'You need to grant camera permissions to use this app');
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const verified = await verifyPermissions();
        if (verified) {
            const image = await launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5
            });
            if (!image.cancelled) {
                setImg(image.uri);
                onImageTaken(image.uri);
            }
        }

    }

    let imagePreview = <Text > No image taken yet.</Text>

    if (img) {
        imagePreview = <Image style={styles.image} source={{ uri: img }}   />
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlineButton icon="camera"   onPress={takeImageHandler}>
                Take a photo
            </OutlineButton>
        </View>
    )
}

const styles = StyleSheet.create({
    
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:Colors.primary100,
        borderRadius:4
    },
    image:{
        width:'100%',
        height:'100%',
    }
})
