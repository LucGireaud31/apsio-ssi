import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { atomClearPassword } from "../../../App";
import { addCard, getCards, removeCard, setCard } from "../../../localApi";
import { theme } from "../../styles/color";
import { ICard } from "../../types/card";
import { Button } from "../shared/Button";
import { Card } from "./Card";

interface CardSelectorProps {
  menu: number;
}

export function CardSelector(props: CardSelectorProps) {
  const { menu } = props;

  const [cards, setCards] = useState<ICard[]>([]);

  const clearPassword = useAtomValue(atomClearPassword);

  useEffect(() => {
    (async () => {
      const newCards = (await getCards(clearPassword))?.[menu] ?? [];
      setCards(newCards);
    })();
  }, [menu]);

  const ref = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <ScrollView ref={ref} horizontal showsHorizontalScrollIndicator={false}>
        {cards.length == 0 && (
          <Text style={styles.noDataText}>Aucune carte</Text>
        )}
        {cards.map((card, i) => (
          <View key={i} style={styles.cardContainer}>
            <Card
              card={card}
              onDelete={() => {
                const newCards = cards.filter((_, j) => i != j);
                setCards(newCards);
                removeCard(i, menu, clearPassword);
                ref.current?.scrollToEnd({ animated: true });
              }}
              onChange={async (name, number, cvv) => {
                setCard(i, menu, { name, number, cvv }, clearPassword);
              }}
            />
          </View>
        ))}
      </ScrollView>
      <Button
        style={styles.button}
        onPress={async () => {
          const newCards = await addCard(menu, clearPassword);

          if (newCards[menu]) {
            setCards(newCards[menu]);
          }

          ref.current?.scrollToEnd({ animated: true });
        }}
      >
        Ajouter une carte
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "50%",
    alignItems: "center",
    height: 300,
  },
  cardContainer: {
    marginHorizontal: 20,
  },
  button: {
    marginTop: 40,
    width: 200,
  },
  noDataText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    color: theme,
    fontWeight: "bold",
  },
});
