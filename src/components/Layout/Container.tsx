import { ReactNode } from "react";
import { View, StyleSheet, Image, StyleProp, ViewStyle, ScrollView } from "react-native"

interface ContainerProps {
    children: ReactNode
    style?: any
};

export function Container(props: ContainerProps) {
    const { children, style } = props;

    const styles = StyleSheet.create({
        container:{
            marginBottom:130,
            
        },
        content: {
            backgroundColor: "white",
            borderRadius: 20,
            marginHorizontal: 25,
            marginVertical:35,
            paddingHorizontal: 40,
            paddingVertical: 30,
            ...style
        }
    });

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>{children}</View>
        </ScrollView>
    );
}