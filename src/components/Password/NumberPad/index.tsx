import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { themeLight } from "../../../styles/color";
import { NumberButton } from "./NumberButton";
import { Row } from "./Row";

interface NumberPadProps {}

export function NumberPad(props: NumberPadProps) {
  const {} = props;

  return (
    <View style={styles.container}>
      <Row>
        <NumberButton index={1} onPress={(n) => {}} />
        <NumberButton index={2} onPress={(n) => {}} />
        <NumberButton index={3} onPress={(n) => {}} />
      </Row>
      <Row>
        <NumberButton index={4} onPress={(n) => {}} />
        <NumberButton index={5} onPress={(n) => {}} />
        <NumberButton index={6} onPress={(n) => {}} />
      </Row>
      <Row>
        <NumberButton index={7} onPress={(n) => {}} />
        <NumberButton index={8} onPress={(n) => {}} />
        <NumberButton index={9} onPress={(n) => {}} />
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: themeLight,
    height: "100%",
    bottom: 0,
    paddingVertical: 40,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});
