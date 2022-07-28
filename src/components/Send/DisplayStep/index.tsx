import { View, StyleSheet } from "react-native";
import { Step } from "./Step";

interface DisplayStepProps {
  steps: number;
  step: number;
}

export function DisplayStep(props: DisplayStepProps) {
  const { steps, step } = props;

  return (
    <View style={styles.container}>
      {Array.from({ length: steps }).map((_, i) => (
        <View key={i} style={styles.stepContainer}>
          <Step disabled={i > step} validated={i < step} index={i} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 40,
    borderRadius: 100,
    paddingRight: 5,
    marginTop: 30,
  },
  stepContainer: {
    width: "33%",
  },
});
