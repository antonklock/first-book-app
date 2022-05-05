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

    position: "absolute",
    top: -100,

    width: 100,
    height: 100,
    borderRadius: 100,

    backgroundColor: "blue",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 15 },
    shadowRadius: 15,
    shadowOpacity: 0.25,
  },
  scanButtonText: {
    color: "white",
  },
});
