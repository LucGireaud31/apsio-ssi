import { ReactNode, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native"
import { ImageButton } from "../Layout/ImageButton";

interface DropDownProps {
    icon: ReactNode,
    label?: string,
    items: IDropDownField[]
};

export interface IDropDownField {
    label?: string,
    value: string
}

export function DropDown(props: DropDownProps) {
    const { icon, label, items } = props;

    const [isOpen, setIsOpen] = useState(false)

    const styles = StyleSheet.create({
        container:{
            marginBottom:20,
        },
        header: {
            flexDirection: "row",
        },
        caretIcon: {
            position: "absolute",
            right: 0,
            transform: [{ rotate: `${90 * (isOpen ? 1 : -1)}deg` }]
        },
        label: {
            paddingVertical: 2,
            marginLeft: 15,
            fontSize: 18,
            fontWeight: "700"
        },
        content:{
            marginHorizontal:47
        }
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {icon}
                <Text style={styles.label}>{label}</Text>
                <ImageButton source={require("../../assets/icons/caret-right.png")} style={styles.caretIcon} onPress={() => setIsOpen(!isOpen)} />

            </View>
            <View style={styles.content}>
                {items.map((item,i)=>(
                    <Text key={i}>{item.value}</Text>
                ))}
            </View>
        </View>
    );
}