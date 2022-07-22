import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native"
import { ICard } from "../../types/card";
import { Button } from "../shared/Button";
import { Card } from "./Card";

interface CardSelectorProps {
    cards: ICard[]
};

export function CardSelector(props: CardSelectorProps) {
    const { cards: cardsProp } = props;

    const [cards, setCards] = useState(cardsProp)

    return (
        <View style={styles.container} >

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                {cards.map((card, i) =>
                    <View key={i} style={styles.cardContainer}>
                        <Card card={card} />
                    </View>
                )}
            </ScrollView>
            <Button style={styles.button} onPress={() => setCards([...cards, { cvv: "", id: "", name: "" }])}>Ajouter une carte</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: "50%",
        alignItems:"center",
        height:300
    },
    cardContainer: {
        marginHorizontal: 20,
    },
    button:{
        marginTop:40,
        width:200,
        
    }
});