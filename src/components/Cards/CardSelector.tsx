import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native"
import { ICard } from "../../types/card";
import { Button } from "../shared/Button";
import { Card } from "./Card";

interface CardSelectorProps {
    cards:ICard[]
};

export function CardSelector(props: CardSelectorProps) {
    const {cards:cardsProp } = props;

    const [cards, setCards] = useState(cardsProp)

    return (

        <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
            {cards.map((card, i) =>
                <View key={i} style={styles.cardContainer}>
                    <Card card={card}/>
                </View>
            )}
            <Button style={styles.cardContainer} onPress={()=>setCards([...cards,{cvv:"XXX",id:"4545 05464 6464 5064",nom:"Nom de la carte"}])}>Ajouter une carte</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop:80,
        paddingTop:150,
        
    },
    cardContainer:{
        marginHorizontal:20,
    }
});