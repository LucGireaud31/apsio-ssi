import { ReactNode } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import { theme } from "../../styles/color";

interface ButtonProps {
  children: ReactNode;
  style?: any;
  onPress?(): void;
  rightIcon?: ReactNode;
  leftIcon?: ReactNode;
  fontSize?: number;
}

export function Button(props: ButtonProps) {
  const { children, style, onPress, rightIcon, leftIcon, fontSize } = props;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme,
      height: 40,
      minWidth: 100,
      justifyContent: "center",
      borderRadius: 10,
      paddingHorizontal: 15,
      position: "relative",
      ...style,
    },
    label: {
      color: "white",
      textAlign: "center",
      fontSize: fontSize ?? 14,
    },
    rightIcon: {
      position: "absolute",
      zIndex: 999,
      right: 10,
    },
    leftIcon: {
      position: "absolute",
      zIndex: 999,
      left: 10,
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.leftIcon}>{leftIcon}</View>
      <Text style={styles.label}>{children}</Text>
      <View style={styles.rightIcon}>{rightIcon}</View>
    </TouchableOpacity>
  );
}
