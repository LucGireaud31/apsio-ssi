import { View, StyleSheet } from "react-native";
import { theme, themeLight } from "../../styles/color";

interface HiddenPasswordProps {
  password: string;
  max?: number;
}

export function HiddenPassword(props: HiddenPasswordProps) {
  const {} = props;

  return (
    <View style={styles.container}>
      <Circle completed={true} />
      <Circle completed={true} />
      <Circle completed={false} />
      <Circle completed={false} />
      <Circle completed={false} />
      <Circle completed={false} />
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
  completed: boolean;
}

function Circle(props: CircleProps) {
  const { size = 20, completed } = props;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderColor: "gray",
        borderWidth: 1,
        marginHorizontal: 0.5,
        borderRadius: size / 2,
        backgroundColor: completed ? themeLight : "white",
      }}
    />
  );
}
