import { View, StyleSheet, Text } from "react-native";
import { SharedValuesType } from "./SelectDataView";
import { Container } from "../Layout/Container";

interface SelectSendTypeViewProps {
  onNextStep(v: SharedValuesType): void;
  sharedValues: SharedValuesType;
}

export function SelectSendTypeView(props: SelectSendTypeViewProps) {
  const { onNextStep, sharedValues } = props;

  return (
    <Container style={styles.container} fix>
      <Text>{JSON.stringify(sharedValues)}</Text>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, height: "103%" },
  text: {
    color: "#C1C1C1",
  },
});
