import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { Text, View, StyleSheet } from "react-native";
import PhotoThumb from "../PhotoThumb/PhotoThumb";

type CameraViewTypes = {
  cameraRef: any;
  imgSource: string;
};

export default function CameraView(props: CameraViewTypes) {
  const { cameraRef, imgSource } = props;
  const [hasPermission, setHasPermission] = useState(false);
  // const [imgSource, setImgSource] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.container}>
        <PhotoThumb imgSource={imgSource} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: 450,
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
