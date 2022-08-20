import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";

interface NumberButtonProps {
  index: number;
  onPress(index: number): void;
}

export function NumberButton(props: NumberButtonProps) {
  const { index, onPress } = props;

  return (
    <TouchableHighlight style={styles.container} onPress={() => {}}>
      <Text style={styles.text}>{index}</Text>
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
    color: "white",
    fontWeight: "bold",
    fontSize: 50,
  },
});
