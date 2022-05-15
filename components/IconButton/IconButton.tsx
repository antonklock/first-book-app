import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type IconButtonPropType = {
  iconName: string;
  iconSize: number;
  iconColor: string;
  handlePress: () => void;
};

export default function IconButton(props: IconButtonPropType) {
  const { iconName, iconSize, iconColor, handlePress } = props;
  return (
    <>
      <Pressable style={styles.icon} onPress={handlePress}>
        <Ionicons name={iconName} size={iconSize} color={iconColor} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
