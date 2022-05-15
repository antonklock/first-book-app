import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type ScanButtonPropType = {
  iconName: string;
  iconSize: number;
  iconColor: string;
  handlePress: () => void;
};

export default function ScanButton(props: ScanButtonPropType) {
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
    flex: 1,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
