import React, { useState, useEffect, useRef } from "react";
import { Camera } from "expo-camera";
import { Text, View, TouchableOpacity, StyleSheet, Button } from "react-native";
import PhotoThumb from "./PhotoThumb";

export default function CameraView() {
  const [hasPermission, setHasPermission] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imgSource, setImgSource] = useState("");
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function snapPhoto() {
    if (cameraRef) {
      let photo: any;
      try {
        photo = await cameraRef.current.takePictureAsync();
      } catch {
        console.log("SHIT!");
      }
      setImgSource(photo.uri);
    }
  }

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={styles.container}>
        <PhotoThumb imgSource={imgSource} />
      </View>
      <Button
        title={"Take picture"}
        onPress={() => {
          console.log(imgSource);
          snapPhoto();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: 400,
    margin: 50,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
