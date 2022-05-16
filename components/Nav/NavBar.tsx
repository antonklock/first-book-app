import { CameraCapturedPicture } from "expo-camera";
import React from "react";
import { View, StyleSheet, Pressable, Text, Dimensions } from "react-native";
import Constants from "expo-constants";

import IconButton from "../IconButton/IconButton";
import ScanButton from "../ScanButton/ScanButton";

const navHeight = Dimensions.get("window").height * 0.87;

const scanButtonHeight = 45;
const scanButtonWidth = scanButtonHeight;
const scanIconSize = scanButtonHeight / 2;

const homeIconSize = 24;
const searchIconSize = 24;

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
    <>
      <View style={styles.nav}>
        <View style={styles.searchButton}>
          <IconButton
            iconName={"search"}
            iconSize={searchIconSize}
            iconColor={"black"}
            handlePress={handleCloseCamera}
          />
        </View>

        <View style={styles.scanButton}>
          <ScanButton
            iconName={"camera"}
            iconSize={scanIconSize}
            iconColor={"white"}
            handlePress={handleClickScan}
          />
        </View>

        <View style={styles.homeButton}>
          <IconButton
            iconName={"home"}
            iconSize={homeIconSize}
            iconColor={"black"}
            handlePress={handleCloseCamera}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: navHeight,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 25,
    shadowOpacity: 0.1,
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  scanButton: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",

    width: scanButtonWidth,
    height: scanButtonHeight,
    borderRadius: 15,

    backgroundColor: "black",
  },
  homeButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    left: Dimensions.get("window").width * 0.05,
  },
  searchButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    right: Dimensions.get("window").width * 0.05,
  },
  closeIcon: {
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
