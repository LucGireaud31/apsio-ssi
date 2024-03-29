import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { ICard } from "../../types/card";
import { ImageButton } from "../Layout/ImageButton";
import { TextInputMask } from "react-native-masked-text";

interface CardProps {
  card: ICard;
  onDelete(): void;
  onChange(name: string, number: string, cvv: string): void;
}

export function Card(props: CardProps) {
  const { card, onDelete, onChange } = props;

  const [name, setName] = useState(card.name);
  const [cvv, setCvv] = useState(card.cvv);
  const [number, setNumber] = useState(card.number);

  useEffect(() => {
    setName(card.name);
    setCvv(card.cvv);
    setNumber(card.number);
  }, [card]);

  useEffect(() => {
    onChange(name ?? "", number ?? "", cvv ?? "");
  }, [name, cvv, number]);

  return (
    <View style={styles.container}>
      <ImageButton
        style={styles.deleteButton}
        source={require("../../../assets/icons/x.png")}
        onPress={onDelete}
      />
      <TextInput
        style={styles.name}
        value={name}
        onChangeText={(newText) => setName(newText)}
        placeholder="Nom de la carte..."
        placeholderTextColor="#a7a7a7"
      />
      <View style={styles.numberContainer}>
        <TextInputMask
          type="credit-card"
          style={styles.number}
          value={number}
          onChangeText={(newText) => setNumber(newText)}
          placeholder="Numéro..."
          placeholderTextColor="#a7a7a7"
          keyboardType="numeric"
          maxLength={19}
        />
        <TextInput
          style={styles.cvv}
          value={cvv}
          onChangeText={(newText) => setCvv(newText)}
          placeholder="Cvv..."
          placeholderTextColor="#a7a7a7"
          maxLength={3}
          keyboardType="numeric"
        />
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
    paddingHorizontal: 40,
    position: "relative",
  },
  name: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  number: {
    color: "white",
  },
  cvv: {
    color: "white",
  },
  numberContainer: {
    marginTop: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "white",
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 4,
  },
});
