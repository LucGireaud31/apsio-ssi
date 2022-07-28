import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { RoundedTop } from "../Layout/RoundedTop";
import { DisplayStep } from "./DisplayStep";

interface SendProps {}

export function Send(props: SendProps) {
  const {} = props;

  const [step, setStep] = useState(1);

  return (
    <View style={styles.container}>
      <RoundedTop />
      <DisplayStep steps={3} step={step} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
