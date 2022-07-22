import { useState } from "react";
import { View, StyleSheet, Text,TextInput } from "react-native"
import { ICard } from "../../types/card";

interface CardProps {
    card: ICard
};

export function Card(props: CardProps) {
    const { card } = props;

    const [name,setName] = useState(card.name)
    const [cvv,setCvv] = useState(card.cvv)
    const [id,setId] = useState(card.id)

    return (
        <View style={styles.container}>
            <TextInput style={styles.name} value={name} onChangeText={(newText)=>setName(newText)}/>
            <View style={styles.numberContainer}>
                <TextInput style={styles.id} value={id} onChangeText={(newText)=>setId(newText)}/>
                <TextInput style={styles.cvv} value={cvv} onChangeText={(newText)=>setCvv(newText)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 300,
        height: 220,
        backgroundColor: "#1C45B0",
        paddingVertical: 20,
        paddingHorizontal: 40
    },
    name: {
        color: "white",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "bold",
    }, id: {
        color: "white",
    },
    cvv: {
        color: "white",
    },
    numberContainer: {
        marginTop: 80,
        flexDirection: "row",
        justifyContent:"space-between"
    }
});