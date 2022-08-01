import { View, StyleSheet } from "react-native";

interface SelectSendTypeViewProps {
  onNextStep(): void;
}

export function SelectSendTypeView(props: SelectSendTypeViewProps) {
  const { onNextStep } = props;

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});
