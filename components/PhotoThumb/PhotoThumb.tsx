import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

interface PhotoThumbProps {
  imgSource: string;
}

const PhotoThumb: React.FC<PhotoThumbProps> = ({ imgSource }): JSX.Element => {
  if (imgSource) {
    return <Image style={styles.thumb} source={{ uri: imgSource }} />;
  } else {
    return <View style={styles.redSquare}></View>;
  }
};

const styles = StyleSheet.create({
  thumb: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  redSquare: {
    backgroundColor: "red",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default PhotoThumb;
