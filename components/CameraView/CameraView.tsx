import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { Text, View, StyleSheet } from "react-native";
import PhotoThumb from "../PhotoThumb/PhotoThumb";

type CameraViewTypes = {
  cameraRef: any;
  imgSource: string;
  cameraActive: boolean;
};

export default function CameraView(props: CameraViewTypes) {
  const { cameraRef, imgSource, cameraActive } = props;
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
      {cameraActive ? (
        <Camera style={styles.camera} ref={cameraRef} />
      ) : (
        <PhotoThumb imgSource={imgSource} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: 450,
  },
});
