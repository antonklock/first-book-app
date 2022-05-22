import { CameraCapturedPicture } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";

import IconButton from "../IconButton/IconButton";
import ScanButton from "../ScanButton/ScanButton";

const navHeight = Dimensions.get("window").height * 0.87;

const scanButtonHeight = 45;
const scanButtonWidth = scanButtonHeight;
const scanIconSize = scanButtonHeight / 2;

const homeButtonHeight = 45;
const homeButtonWidth = homeButtonHeight;

const buttonHeight = 45;
const buttonWidth = buttonHeight;
const searchBarActiveFlex = 5;

const homeIconSize = 24;
const searchIconSize = 24;

const activeColor = "black";

type NavPropsType = {
  setUseCamera: (useCamera: boolean) => void;
  useCamera: boolean;
  takePhoto: (cameraRef: any) => Promise<CameraCapturedPicture | null>;
  cameraRef: React.MutableRefObject<null>;
  setImgSource: (imgUri: string) => void;
  cameraActive: boolean;
  setCameraActive: (camActive: boolean) => void;
  setSearchText: (searchText: string) => void;
};

export default function NavBar(props: NavPropsType) {
  const [searchFieldActive, setSearchFieldActive] = useState(false);
  const [activeButton, setActiveButton] = useState("home");

  const [keyboardStatus, setKeyboardStatus] = useState("");
  const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
  const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      _keyboardDidShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      _keyboardDidHide
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const handleNavPosition = () => {
    if (keyboardStatus == "Keyboard Shown") {
      return { ...styles.nav, marginBottom: 350 };
    } else {
      return styles.nav;
    }
  };

  const {
    useCamera,
    setUseCamera,
    takePhoto,
    cameraRef,
    setImgSource,
    cameraActive,
    setCameraActive,
    setSearchText,
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
    setSearchFieldActive(false);
    setActiveButton("scan");
  }

  function handleCloseCamera() {
    setUseCamera(false);
    setCameraActive(true);
  }

  function handleClickSearch() {
    setActiveButton("search");
    handleCloseCamera();
    setSearchFieldActive(true);
  }

  function handleClickHome() {
    setActiveButton("home");
    handleCloseCamera();
    setSearchFieldActive(false);
  }

  function iconBackground(buttonToCheck: string) {
    if (activeButton === buttonToCheck) {
      return "white";
    } else {
      return "black";
    }
  }

  function buttonBackground(buttonToCheck: string) {
    if (activeButton === buttonToCheck) {
      return "black";
    } else {
      return "white";
    }
  }

  return (
    <>
      <View style={handleNavPosition()}>
        <View
          style={
            searchFieldActive
              ? { ...styles.buttonContainer, flex: searchBarActiveFlex }
              : styles.buttonContainer
          }
        >
          <View style={{ flex: 0 }}>
            <View
              style={{
                ...styles.button,
                ...styles.iconShadow,
                backgroundColor: buttonBackground("search"),
              }}
            >
              <IconButton
                iconName={"search"}
                iconSize={searchIconSize}
                iconColor={iconBackground("search")}
                handlePress={handleClickSearch}
              />
            </View>
          </View>

          {searchFieldActive ? (
            <TextInput
              style={styles.textInput}
              onChangeText={setSearchText}
            ></TextInput>
          ) : (
            false
          )}
        </View>
        <View style={styles.buttonContainer}>
          <View
            style={{
              ...styles.button,
              ...styles.iconShadow,
              backgroundColor: buttonBackground("scan"),
            }}
          >
            <ScanButton
              iconName={"camera"}
              iconSize={scanIconSize}
              iconColor={iconBackground("scan")}
              handlePress={handleClickScan}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View
            style={{
              ...styles.button,
              ...styles.iconShadow,
              backgroundColor: buttonBackground("home"),
            }}
          >
            <IconButton
              iconName={"home"}
              iconSize={homeIconSize}
              iconColor={iconBackground("home")}
              handlePress={handleClickHome}
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    height: 75,
    flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowRadius: 25,
    shadowOpacity: 0.1,

    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: buttonWidth,
    height: buttonHeight,
    borderRadius: 15,
    backgroundColor: "black",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1.5,
    borderRadius: 25,
    padding: 4,
    height: 35,
    marginLeft: 10,
    marginRight: 5,
    backgroundColor: "white",
  },
  iconShadow: {
    shadowColor: "black",
    shadowRadius: 2,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
  },
});
