import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import { RoundedTop } from "../Layout/RoundedTop";
import HorizontalScrollMenu from '@nyashanziramasanga/react-native-horizontal-scroll-menu/src';
import { useState } from "react";
import { theme } from "../../styles/color";
import { CardSelector } from "./CardSelector";
import { useLocalApi } from "../../hooks/useLoacalApi";
import { getCards } from "../../../localApi";
import { ICard } from "../../types/card";

interface CardsProps {
};

const navigationTabs = [
    {
        id: 0,
        name: 'Carte bleue',
    },
    {
        id: 1,
        name: 'Carte d\'identité',
    }
];

export function Cards(props: CardsProps) {
    const { } = props;

    const [selectedMenu, setSelectedMenu] = useState(0);

    const { data: cards, isLoading } = useLocalApi<{ [key: string]: ICard[] }>({ promise: () => getCards() })

    return (
        <View style={styles.container}>
            <RoundedTop />
            {!isLoading &&
                <CardSelector cards={cards ? cards[selectedMenu] : []}/>}
            <View style={styles.scrollMenu}>
                <HorizontalScrollMenu
                    items={navigationTabs}
                    onPress={(route) => setSelectedMenu(route.id)}
                    selected={selectedMenu}
                    itemWidth={150}
                    activeBackgroundColor={theme}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollMenu: {
        backgroundColor: "white"
    }
});