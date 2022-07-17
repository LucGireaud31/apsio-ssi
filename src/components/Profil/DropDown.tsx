import { ReactNode, useRef, useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, TextInput } from "react-native"
import { setProfil } from "../../../localApi";
import { ImageButton } from "../Layout/ImageButton";
import { Input } from "../shared/Input";

export interface IDropDownField {
    label?: string,
    value: string,
}

interface DropDownProps {
    icon: ReactNode,
    label?: string,
    items: { label: string, value: string, accessor: string }[],
};

export function DropDown(props: DropDownProps) {
    const { icon, label } = props;

    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState(props.items)

    const firstInputRef = useRef<TextInput>(null)

    const dynamicStyle = StyleSheet.create({
        caretIcon: {
            width: 32,
            height: 32,
            position: "absolute",
            right: 0,
            transform: [{ rotate: `${90 * (isOpen ? 1 : -1)}deg` }]
        }
    });

    const filteredItems = items.filter(item => item.value && item.value != "")

    function handleSubmit(accessor: string, newValue: string, label: string) {
        setProfil(accessor, newValue)
        setItems(items.map(item => {
            if (item.accessor == accessor) item.value = newValue
            return item
        }))
    }

    return (
        <View>
            <TouchableOpacity onPress={async () => {
                setIsOpen(!isOpen);
                // await sleep(0)
                // firstInputRef.current?.focus()
            }} >
                <View style={styles.header} >
                    {icon}
                    <Text style={styles.label}>{label}</Text>
                    <Image source={require("../../../assets/icons/caret-right.png")} style={dynamicStyle.caretIcon} />

                </View>
                {!isOpen &&
                    <View style={styles.content}>
                        {filteredItems.length == 0 && <Text style={styles.noData}>Aucune données</Text>}
                        {filteredItems.map((item, i) => (
                            <Text key={i}>{item.value}</Text>
                        ))}
                    </View>}
            </TouchableOpacity>
            {isOpen &&
                <View style={styles.content}>
                    {items.map((item, i) =>
                        <Input inputRef={i == 0 ? firstInputRef : null} key={i} label={item.label} defaultValue={item.value} onSubmit={(value) => handleSubmit(item.accessor, value, item.label)} />
                    )}
                </View>
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
    content: {
        marginHorizontal: 47
    },
    noData: {
        color: "#00000050"
    }
});