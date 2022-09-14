import { LegacyRef, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { theme } from "../../styles/color";

interface InputProps {
  label?: string;
  defaultValue?: string;
  onSubmit?(value: string): void;
  inputRef?: LegacyRef<TextInput>;
  titleStyle?: any;
  isPassword?: boolean;
  isNumeric?: boolean;
  maxLength?: number;
  onChange?(newText: string): void;
}

export function Input(props: InputProps) {
  const {
    label,
    defaultValue,
    onSubmit,
    inputRef,
    titleStyle,
    isPassword = false,
    isNumeric = false,
    maxLength,
    onChange,
  } = props;

  const [value, setValue] = useState(defaultValue ?? "");

  return (
    <View>
      {label && (
        <Text style={{ ...styles.formLabel, ...titleStyle }}>{label}</Text>
      )}
      <View>
        <TextInput
          secureTextEntry={isPassword}
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={(newValue) => {
            setValue(newValue);
            onChange && onChange(newValue);
          }}
          onBlur={() => onSubmit && onSubmit(value)}
          {...(isNumeric && { keyboardType: "numeric" })}
          maxLength={maxLength}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: theme,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 13,
    paddingLeft: 8,
    marginTop: 0,
    marginBottom: 10,
    height: 30,
    paddingRight: 8,
  },
  formLabel: {
    fontWeight: "100",
    fontSize: 12,
    color: "gray",
  },
  check: {
    position: "absolute",
    top: 2.5,
    right: 5,
  },
});
