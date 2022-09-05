import { StyleSheet, Text, TouchableHighlight, Image } from "react-native";
import { theme } from "../../../styles/color";

interface NumberButtonProps {
  index: string | "fingerprint" | "cancel";
  onPress(index: string): void;
}

export function NumberButton(props: NumberButtonProps) {
  const { index, onPress } = props;

  return (
    <TouchableHighlight
      style={styles.container}
      onPress={() => onPress(index)}
      underlayColor={`${theme}30`}
    >
      {index == "fingerprint" ? (
        <Image
          source={require("../../../../assets/icons/fingerprint.png")}
          style={styles.image}
        />
      ) : index == "cancel" ? (
        <Image
          source={require("../../../../assets/icons/backspace.png")}
          style={styles.image}
        />
      ) : (
        <Text style={styles.text}>{index}</Text>
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  text: {
    color: theme,
    fontWeight: "bold",
    fontSize: 35,
  },
  image: {
    width: 50,
    height: 50,
  },
});
