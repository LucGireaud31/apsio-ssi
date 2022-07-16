import { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageSourcePropType } from "react-native";
import { theme } from "../../styles/color";
import { ImageButton } from "./ImageButton"

const LINKS = [
    {
        source: require('../../assets/icons/user.png'),
        name: "Profil"
    },
    {
        source: require('../../assets/icons/cardholder.png'),
        name: "Home"
    },
    {
        source: require('../../assets/icons/arrows-down-up.png'),
        name: "Home"
    },
    {
        source: require('../../assets/icons/bank.png'),
        name: "Home"
    },
    {
        source: require('../../assets/icons/currency-eth.png'),
        name: "Home"
    },
]

export function Footer({ navigation }: any) {

    const [selected, setSelected] = useState(2);

    return (
        <View style={styles.container}>
            {LINKS.map((link, i) =>
                <View key={i} style={{
                    ...styles.iconButton,
                    backgroundColor: i == selected ? "#FFFFFF3B" : "#ffffff00",
                }
                }>
                    <ImageButton source={link.source}
                        onPress={() => { setSelected(i); navigation.navigate(link.name) }} />
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme,
        height: 60,
        flexDirection: "row",
        paddingTop: 5,
        justifyContent: "space-between",
        paddingHorizontal: 32,
    },
    iconButton: {
        height: 50,
        width: 50,
        justifyContent: "center",
        paddingHorizontal: 9,
        borderRadius: 25
    }
})