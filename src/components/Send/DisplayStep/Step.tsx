import { View, StyleSheet, Text } from "react-native";
import { theme } from "../../../styles/color";

interface StepProps {
  disabled: boolean;
  validated: boolean;
  index: number;
}

export function Step(props: StepProps) {
  const { disabled, validated, index } = props;

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
      ...(validated && {
        color: "white",
      }),
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{index}</Text>
    </View>
  );
}
