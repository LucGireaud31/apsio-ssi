import { ReactNode } from "react";
import { View, StyleSheet, TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native"
import { theme } from "../../styles/color";

interface ButtonProps {
    children: ReactNode,
    style?: any,
    onPress?():void,
};

export function Button(props: ButtonProps) {
    const { children, style,onPress } = props;

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme,
            height: 40,
            minWidth: 100,
            justifyContent: "center",
            borderRadius:10,
            paddingHorizontal:15,
            ...style
        },
        label: {
            color:"white",
            textAlign: "center"
        }
    });

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.label}>{children}</Text>
        </TouchableOpacity>
    );
}