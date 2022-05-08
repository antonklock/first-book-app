import { StyleSheet, Text, View, Alert } from "react-native";
import { CameraCapturedPicture } from "expo-camera";
import React, { useState, useRef } from "react";
import CameraView from "./components/CameraView/CameraView";
import NavBar from "./components/Nav/NavBar";

export default function App() {
  const [useCamera, setUseCamera] = useState(false);
  const handleSetUseCamera = (useCamera: boolean) => setUseCamera(useCamera);

  const [imgSource, setImgSource] = useState("");
  const handleSetImgSource = (imgUri: string) => setImgSource(imgUri);

  const cameraRef = useRef(null);

  return (
    <View style={styles.app}>
      <View style={styles.container}>
        {useCamera ? (
          <CameraView cameraRef={cameraRef} imgSource={imgSource} />
        ) : (
          <Text>Press button to use camera.</Text>
        )}
      </View>
      <NavBar
        setUseCamera={handleSetUseCamera}
        useCamera={useCamera}
        takePhoto={takePhoto}
        cameraRef={cameraRef}
        setImgSource={handleSetImgSource}
      />
    </View>
  );
}

async function takePhoto(
  cameraRef: any
): Promise<CameraCapturedPicture | null> {
  let photo: CameraCapturedPicture;
  try {
    photo = await cameraRef.current.takePictureAsync();
    Alert.alert("Picture taken", `${photo.uri}`, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
    return photo;
  } catch {
    console.log("Failed to take picture!");
    return null;
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
