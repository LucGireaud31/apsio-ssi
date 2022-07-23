import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native"
import { ICard } from "../../types/card";
import MaskInput from 'react-native-mask-input';
import { setCard } from "../../../localApi";

interface CardProps {
    card: ICard
    index:number
};

export function Card(props: CardProps) {
    const { card,index } = props;

    const [name, setName] = useState(card.name)
    const [cvv, setCvv] = useState(card.cvv)
    const [number, setNumber] = useState(card.number)

    useEffect(()=>{
        setCard(index,0,{name,number,cvv})
    },[name,cvv,number])

    return (
        <View style={styles.container}>
            <TextInput style={styles.name} value={name} onChangeText={(newText) => setName(newText)} placeholder="Nom de la carte..." placeholderTextColor="#a7a7a7" />
            <View style={styles.numberContainer}>
                <MaskInput style={styles.number} value={"" + number} onChangeText={(newText) => setNumber(newText)} placeholder="Numéro..." placeholderTextColor="#a7a7a7" maxLength={19}
                keyboardType="numeric" 
                mask={[/\d/, /\d/, /\d/, /\d/, ' ',/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
                />
                <TextInput style={styles.cvv} value={cvv} onChangeText={(newText) => setCvv(newText)} placeholder="Cvv..." placeholderTextColor="#a7a7a7" maxLength={3} keyboardType="numeric" />
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
    }, number: {
        color: "white",
    },
    cvv: {
        color: "white",
    },
    numberContainer: {
        marginTop: 80,
        flexDirection: "row",
        justifyContent: "space-between"
    }
});