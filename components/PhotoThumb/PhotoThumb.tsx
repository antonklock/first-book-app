import React, { useState, useEffect, useRef } from "react";
import { View, Image, StyleSheet } from "react-native";

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
    width: 50,
    height: 50,
    bottom: 50,
  },
  redSquare: {
    backgroundColor: "red",
    width: 50,
    height: 50,
    bottom: 50,
  },
});

export default PhotoThumb;
