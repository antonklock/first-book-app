import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Alert } from "react-native";
import { Camera } from "expo-camera";
import React, { useState } from "react";
import CameraView from "./components/CameraView";

export default function App() {
  const [useCamera, setUseCamera] = useState(false);
  const [camButtonText, setCamButtonText] = useState("Scan book");

  return (
    <>
      <View style={styles.container}>
        {useCamera ? <CameraView /> : <Text>Press button to use camera.</Text>}
      </View>
      <View style={styles.container}>
        <Button
          title={camButtonText}
          onPress={() => {
            setUseCamera(!useCamera);
            useCamera
              ? setCamButtonText("Scan book")
              : setCamButtonText("Stop scanning");
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
