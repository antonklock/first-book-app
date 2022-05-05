import { WhiteBalance } from "expo-camera/build/Camera.types";
import React from "react";
import { View, StyleSheet, Button, Pressable, Text } from "react-native";

type NavPropsType = {
  setUseCamera: (useCamera: boolean) => void;
  useCamera: boolean;
};

export default function NavBar(props: NavPropsType) {
  const { useCamera } = props;
  const { setUseCamera } = props;
  function handleClickScan() {
    if (!useCamera) {
      setUseCamera(true);
    } else {
    }
  }

  function handleCloseCamera() {
    setUseCamera(false);
  }
  return (
    <>
      <View style={styles.nav}>
        <Pressable style={styles.scanButton} onPress={handleClickScan}>
          <Text style={styles.scanButtonText}>Scan</Text>
        </Pressable>
        {useCamera ? (
          <Button title="Close camera" onPress={handleCloseCamera}></Button>
        ) : (
          false
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "red",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 800,
  },
  scanButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "blue",
    borderRadius: 100,
    marginTop: -100,
  },
  scanButtonText: {
    color: "white",
  },
});
