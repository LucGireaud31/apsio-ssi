import { Children, ReactNode } from "react";
import { View, StyleSheet } from "react-native";

interface RowProps {
  children: ReactNode;
}

export function Row(props: RowProps) {
  const { children } = props;

  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
});
