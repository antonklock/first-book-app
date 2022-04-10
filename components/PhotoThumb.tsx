import React, { useState, useEffect, useRef } from "react";
import { Image, StyleSheet } from "react-native";

interface PhotoThumbProps {
  imgSource: string;
}

const PhotoThumb: React.FC<PhotoThumbProps> = ({ imgSource }): JSX.Element => {
  if (imgSource) {
    return <Image style={styles.thumb} source={{ uri: imgSource }} />;
  } else {
    return null;
  }
};

const styles = StyleSheet.create({
  thumb: {
    width: 50,
    height: 50,
  },
});

export default PhotoThumb;
