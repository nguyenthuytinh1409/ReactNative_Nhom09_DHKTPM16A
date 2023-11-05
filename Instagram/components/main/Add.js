import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export default function Add({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [CameraPermission, requestCameraPermission] = Camera.useCameraPermissions();
  const [GalleryOermission, requestGalleryOermission] = ImagePicker.useMediaLibraryPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);



  if (!CameraPermission || !GalleryOermission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!CameraPermission.granted || !GalleryOermission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestCameraPermission} title="grant Camera permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const tackPicture = async () => {
    if(camera) {
      const photo = await camera.takePictureAsync(null);
      setImage(photo.uri);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.uri);
    } else {
      alert('You did not select any image.');
    }
  };


  return (
    <View style={{flex: 1}}>
      <View style={styles.cameraContainer}>
        <Camera 
        ref={ref => setCamera(ref)}
        style={styles.camera} 
        type={type}
        ratio={"1:1"}
        ></Camera>
      </View>
      
        <TouchableOpacity onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <Button 
          title="Take Picture"
          onPress={() => tackPicture()}
        />
        <Button 
          title="Pick Image From Gallery"
          onPress={() => pickImage()}
        />
        <Button 
          title="Save"
          onPress={() => navigation.navigate('Save', {image})}
        />
        {
          image && <Image source={{uri: image}} style={{flex: 1}}/>
        }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  camera: {
    flex: 1,
    aspectRatioL: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
