import { View, StyleSheet } from "react-native";
import { theme, themeLight } from "../../styles/color";

interface HiddenPasswordProps {
  password: string;
  max?: number;
}

export function HiddenPassword(props: HiddenPasswordProps) {
  const { password, max = 6 } = props;

  return (
    <View style={styles.container}>
      {password.split("").map((_, i) => (
        <Circle key={i} completed={true} />
      ))}
      {Array.from({ length: max - password.length }).map((_, i) => (
        <Circle key={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 20,
  },
});

interface CircleProps {
  size?: number;
  completed?: boolean;
}

function Circle(props: CircleProps) {
  const { size = 20, completed } = props;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderColor: "black",
        borderWidth: 1,
        marginHorizontal: 0.5,
        borderRadius: size / 2,
        backgroundColor: completed ? themeLight : "white",
      }}
    />
  );
}
