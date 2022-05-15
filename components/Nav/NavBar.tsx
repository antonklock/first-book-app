import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

type NavPropsType = {
  setUseCamera: (useCamera: boolean) => void;
  useCamera: boolean;
  takePhoto: (cameraRef: any) => Promise<CameraCapturedPicture | null>;
  cameraRef: React.MutableRefObject<null>;
  setImgSource: (imgUri: string) => void;
  cameraActive: boolean;
  setCameraActive: (camActive: boolean) => void;
};

export default function NavBar(props: NavPropsType) {
  const {
    useCamera,
    setUseCamera,
    takePhoto,
    cameraRef,
    setImgSource,
    cameraActive,
    setCameraActive,
  } = props;

  function handleClickScan() {
    if (!useCamera) {
      setUseCamera(true);
    } else {
      if (cameraActive) {
        takePhoto(cameraRef).then((result: CameraCapturedPicture | null) => {
          if (result !== null) {
            setImgSource(result.uri);
          }
        });

        setCameraActive(false);
      } else {
        setCameraActive(true);
      }
    }
  }

  function handleCloseCamera() {
    setUseCamera(false);
    setCameraActive(true);
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
