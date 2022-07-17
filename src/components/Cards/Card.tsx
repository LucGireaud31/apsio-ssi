import { View, StyleSheet, Text } from "react-native"
import { ICard } from "../../types/card";

interface CardProps {
    card: ICard
};

export function Card(props: CardProps) {
    const { card } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{card.nom}</Text>
            <View style={styles.numberContainer}>
                <Text style={styles.id}>{card.id}</Text>
                <Text style={styles.cvv}>{card.cvv}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        width: 350,
        height: 250,
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