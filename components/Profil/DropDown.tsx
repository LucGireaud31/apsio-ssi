import { ReactNode, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from "react-native"
import { theme } from "../../styles/color";
import { ImageButton } from "../Layout/ImageButton";
import { Input } from "../shared/Input";

interface DropDownProps {
    icon: ReactNode,
    label?: string,
    children:ReactNode,
    items:string[]};

export interface IDropDownField {
    label?: string,
    value: string,
}

export function DropDown(props: DropDownProps) {
    const { icon, label, items,children } = props;

    const [isOpen, setIsOpen] = useState(false)

    const dynamicStyle = StyleSheet.create({
        caretIcon: {
            width: 32,
            height: 32,
            position: "absolute",
            right: 0,
            transform: [{ rotate: `${90 * (isOpen ? 1 : -1)}deg` }]
        }
    });

    return (
        <View>

            <TouchableOpacity onPress={() => setIsOpen(!isOpen)} >
                <View style={styles.header} >
                    {icon}
                    <Text style={styles.label}>{label}</Text>
                    <Image source={require("../../assets/icons/caret-right.png")} style={dynamicStyle.caretIcon} />

                </View>
                {!isOpen &&
                    <View style={styles.content}>
                        {items.map((item, i) => (
                            <Text key={i}>{item}</Text>
                        ))}
                    </View>}
            </TouchableOpacity>
            {isOpen &&
                children
            }
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
    },
    label: {
        paddingVertical: 2,
        marginLeft: 15,
        fontSize: 18,
        fontWeight: "700"
    },
    content:{
        marginHorizontal: 47
    }
});