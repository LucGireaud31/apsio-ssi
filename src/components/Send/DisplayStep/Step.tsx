import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { theme } from "../../../styles/color";

interface StepProps {
  disabled: boolean;
  validated: boolean;
  index: number;
  onPress(): void;
}

export function Step(props: StepProps) {
  const { disabled, validated, index, onPress } = props;

  const styles = StyleSheet.create({
    container: {
      borderWidth: 3,
      borderColor: theme,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginVertical: 5,
      marginLeft: 5,
      borderRadius: 50,
      ...(disabled && {
        backgroundColor: "#ECECEC",
        borderColor: "white",
      }),
      ...(validated && {
        backgroundColor: theme,
        borderColor: "white",
      }),
    },
    text: {
      fontWeight: "bold",
      textAlign: "center",
      color: validated ? "white" : "black",
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!validated}
      onPress={onPress}
    >
      <Text style={styles.text}>{index}</Text>
    </TouchableOpacity>
  );
}
