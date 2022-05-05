import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Alert } from "react-native";
import { Camera } from "expo-camera";
import React, { useState, useEffect } from "react";
import CameraView from "./components/CameraView";
import NavBar from "./components/Nav/NavBar";

export default function App() {
  const [useCamera, setUseCamera] = useState(false);
  const handleSetUseCamera = (useCamera: boolean) => setUseCamera(useCamera);

  return (
    <View style={styles.app}>
      <View style={styles.container}>
        {useCamera ? <CameraView /> : <Text>Press button to use camera.</Text>}
      </View>
      <NavBar setUseCamera={handleSetUseCamera} useCamera={useCamera} />
    </View>
  );
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
