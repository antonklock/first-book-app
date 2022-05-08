import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { View, StyleSheet, Button, Pressable, Text } from "react-native";

type NavPropsType = {
  setUseCamera: (useCamera: boolean) => void;
  useCamera: boolean;
  takePhoto: (cameraRef: any) => Promise<CameraCapturedPicture | null>;
  cameraRef: any;
  setImgSource: (imgUri: string) => void;
};

export default function NavBar(props: NavPropsType) {
  const { useCamera, setUseCamera, takePhoto, cameraRef, setImgSource } = props;

  function handleClickScan() {
    if (!useCamera) {
      setUseCamera(true);
    } else {
      takePhoto(cameraRef).then((result: CameraCapturedPicture | null) => {
        if (result !== null) {
          setImgSource(result.uri);
        }
      });
    }
  }

  function handleCloseCamera() {
    setUseCamera(false);
  }
  return (
    <View style={styles.nav}>
      <Pressable style={styles.scanButton} onPress={handleClickScan}>
        <Text style={styles.scanButtonText}>Scan</Text>
      </Pressable>
      {useCamera ? (
        <Pressable style={styles.closeCameraButton} onPress={handleCloseCamera}>
          <Text style={styles.closeIcon}>X</Text>
        </Pressable>
      ) : (
        false
      )}
    </View>
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
  closeCameraButton: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "red",

    position: "absolute",
    right: 100,

    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
  },
  closeIcon: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
});
