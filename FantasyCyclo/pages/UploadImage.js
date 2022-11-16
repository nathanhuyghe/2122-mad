import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { auth, db, storage } from "../firebase"

export default function UploadImage({ navigation }) {
  const [cameraPermission, setCameraPermission] = useState(null)
  const [galleryPermission, setGalleryPermission] = useState(null)

  const [camera, setCamera] = useState(null)
  const [imageUri, setImageUri] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)

  const permisionFunction = async () => {
    const cameraPermission = await Camera.requestPermissionsAsync()

    setCameraPermission(cameraPermission.status === 'granted')

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync()

    setGalleryPermission(imagePermission.status === 'granted')

    if (
      imagePermission.status !== 'granted' &&
      cameraPermission.status !== 'granted'
    ) {
      alert('Permission for media access needed.')
    }
  }

  useEffect(() => {
    permisionFunction()
  }, [])

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null)
      setImageUri(data.uri)
    }
  }  
  
  const Upload = async () => {
    const response = await fetch(imageUri)
    const blob = await response.blob()
    auth.onAuthStateChanged(user => {
      if (user) {
        storage.ref(user.uid + '.png').put(blob).then(navigation.navigate('Home'))
      }
    })
  }

  const Back = () => {
    navigation.navigate('Settings')
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
      {imageUri 
        ? <Image source={{ uri: imageUri }} style={{ flex: 1 }} /> :
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      }
      </View>
      {
        imageUri ?
        <Button title={'Upload'} onPress={Upload} /> :
        <Button title={'Take Picture'} onPress={takePicture} />
      }      
      <Button title={'Back'} onPress={Back} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 0.1,
    padding: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
})