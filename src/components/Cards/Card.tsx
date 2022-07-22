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
            <TextInput style={styles.name} value={name} onChangeText={(newText)=>setName(newText)} placeholder="Nom de la carte..."  placeholderTextColor="#a7a7a7"/>
            <View style={styles.numberContainer}>
                <TextInput style={styles.id} value={id} onChangeText={(newText)=>setId(newText)} placeholder="Numéro..."  placeholderTextColor="#a7a7a7" maxLength={16} keyboardType="numeric"/>
                <TextInput style={styles.cvv} value={cvv} onChangeText={(newText)=>setCvv(newText)} placeholder="Cvv..." placeholderTextColor="#a7a7a7" maxLength={3} keyboardType="numeric"/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 300,
        height: 220,
        backgroundColor: "#476dcf",
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