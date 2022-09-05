import { LegacyRef } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { Input } from "../../shared/Input";

interface InputPasswordProps {
  title: string;
  onSubmit(value: string): void;
  subTitle?: string;
  style?: any;
  inputRef?: LegacyRef<TextInput>;
  maxLength?: number;
}

export function InputPassword(props: InputPasswordProps) {
  const { title, onSubmit, subTitle, style, inputRef, maxLength } = props;

  return (
    <View style={styles.container}>
      <Input
        inputRef={inputRef}
        isPassword
        isNumeric
        onSubmit={onSubmit}
        label={title}
        titleStyle={styles.title}
        maxLength={maxLength}
      />
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: { fontSize: 14, marginBottom: 5 },
  subTitle: { color: "gray", fontSize: 12, marginTop: -5, marginBottom: 30 },
});
