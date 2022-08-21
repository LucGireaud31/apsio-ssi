import React from "react";
import { View, StyleSheet } from "react-native";
import { themeLight } from "../../../styles/color";
import { NumberButton } from "./NumberButton";
import { Row } from "./Row";

interface NumberPadProps {
  onChange(value: string | "cancel" | "fingerprint"): void;
}

export function NumberPad(props: NumberPadProps) {
  const { onChange } = props;

  return (
    <View style={styles.container}>
      <Row>
        <NumberButton index="1" onPress={onChange} />
        <NumberButton index="2" onPress={onChange} />
        <NumberButton index="3" onPress={onChange} />
      </Row>
      <Row>
        <NumberButton index="4" onPress={onChange} />
        <NumberButton index="5" onPress={onChange} />
        <NumberButton index="6" onPress={onChange} />
      </Row>
      <Row>
        <NumberButton index="7" onPress={onChange} />
        <NumberButton index="8" onPress={onChange} />
        <NumberButton index="9" onPress={onChange} />
      </Row>
      <Row>
        <NumberButton index="fingerprint" onPress={onChange} />
        <NumberButton index="0" onPress={onChange} />
        <NumberButton index="cancel" onPress={onChange} />
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    height: "100%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    alignItems: "center",
    paddingTop: 30,
  },
});
