import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { theme } from "../../styles/color";
import { ImageButton } from "./ImageButton"

const LINKS = [
    {
        source: require('../../../assets/icons/arrows-down-up.png'),
        name: "Send"
    },
    {
        source: require('../../../assets/icons/cardholder.png'),
        name: "Cards"
    },
    {
        source: require('../../../assets/icons/bank.png'),
        name: "Banks"
    },
    {
        source: require('../../../assets/icons/currency-eth.png'),
        name: "Cryptos"
    },
    {
        source: require('../../../assets/icons/user.png'),
        name: "Profil"
    },
]

export function Footer({ navigation }: BottomTabBarProps) {

    return (
        <View style={styles.container}>
            {LINKS.map((link, i) =>
                <View key={i} style={{
                    ...styles.iconButton,
                    backgroundColor: (i == navigation.getState().index) ? "#FFFFFF3B" : "#ffffff00",
                }
                }>
                    <ImageButton source={link.source}
                        onPress={() => navigation.navigate(link.name)} />
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