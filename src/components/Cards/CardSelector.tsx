import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { addCard, getCards, removeCard, setCard } from "../../../localApi";
import { ICard } from "../../types/card";
import { Button } from "../shared/Button";
import { Card } from "./Card";

interface CardSelectorProps {
  menu: number;
}

export function CardSelector(props: CardSelectorProps) {
  const { menu } = props;

  const [cards, setCards] = useState<ICard[]>([]);

  useEffect(() => {
    (async () => {
      const newCards = (await getCards())?.[menu] ?? [];

      setCards(newCards);
    })();
  }, [menu]);

  const ref = useRef<ScrollView>(null);

  return (
    <View style={styles.container}>
      <ScrollView ref={ref} horizontal showsHorizontalScrollIndicator={false}>
        {cards.map((card, i) => (
          <View key={i} style={styles.cardContainer}>
            <Card
              card={card}
              index={i}
              onDelete={() => {
                const newCards = cards.filter((_, j) => i != j);
                setCards(newCards);
                removeCard(i, menu);
                ref.current?.scrollToEnd({ animated: true });
              }}
              onChange={(name, number, cvv) =>
                setCard(i, menu, { name, number, cvv })
              }
            />
          </View>
        ))}
      </ScrollView>
      <Button
        style={styles.button}
        onPress={async () => {
          const newCards = await addCard(menu);

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
});
