import { LegacyRef, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native"
import { theme } from "../../src/styles/color";

interface InputProps {
    label?: string,
    defaultValue?: string,
    onSubmit?(value: string): void,
    inputRef?: LegacyRef<TextInput>

};

export function Input(props: InputProps) {
    const { label, defaultValue, onSubmit,inputRef } = props;

    const [value, setValue] = useState(defaultValue ?? "")

    const dynamicStyle = StyleSheet.create({

    });

    return <View>
        {label &&
            <Text style={styles.formLabel}>{label}</Text>}
        <View>
            <TextInput ref={inputRef} style={styles.input} value={value} onChangeText={(newValue) => { setValue(newValue) }} onBlur={() => onSubmit && onSubmit(value)} />
        </View>
    </View>
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
        color: "gray"
    },
    check: {
        position: "absolute",
        top: 2.5,
        right: 5,
    }
});