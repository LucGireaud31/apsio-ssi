import { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getCards, getProfil } from "../../../localApi";
import { useLocalApi } from "../../hooks/useLoacalApi";
import { ICard } from "../../types/card";
import { IProfil } from "../../types/profil";
import { Container } from "../Layout/Container";
import { RoundedTop } from "../Layout/RoundedTop";
import { DataSelector } from "./DataSelector";
import { DisplayStep } from "./DisplayStep";

interface SendProps {}

export function Send(props: SendProps) {
  const {} = props;

  const [step, setStep] = useState(0);

  const [sharedValues, setSharedValues] = useState<{
    profil: string[];
    cards: string[];
  }>({
    profil: [],
    cards: [],
  });

  const { data: profil } = useLocalApi<IProfil>({
    promise: () => getProfil(),
  });
  const { data: cards } = useLocalApi<{
    [key: string]: ICard[];
  } | null>({
    promise: () => getCards(),
  });

  const [openProfil, setOpenProfil] = useState(false);
  const [openCards, setOpenCards] = useState(false);

  const cardsItems = useMemo(() => {
    if (!cards) return [];
    const entries: any[] = [];

    const result: { label: string; value: string }[] = [];

    Object.values(cards).forEach((v, i) => {
      entries.push({ ...v, type: "" + i });
    });

    entries.map((obj) => {
      const type = obj.type;
      Object.entries(obj).map((card: any) => {
        if (card[0] != "type") {
          result.push({ label: card[1].name, value: `${type}_${card[0]}` });
        }
      });
    });

    return result;
  }, [cards]);
  return (
    <View style={styles.container}>
      <RoundedTop />
      <DisplayStep steps={3} step={step} />
      {profil && cards && (
        <Container style={{ marginTop: 20, height: "100%" }} fix>
          <Text style={styles.text}>
            Sélectionner les informations à envoyer
          </Text>
          <DataSelector
            label="Profil"
            source={require("../../../assets/icons/user_theme.png")}
            items={Object.entries(profil).map((entry) => ({
              label: entry[1],
              value: entry[0],
            }))}
            onChange={(newValues) => {
              setSharedValues({
                ...sharedValues,
                profil: newValues.map((nv) => nv.toLocaleString()),
              });
            }}
            open={openProfil}
            setOpen={setOpenProfil}
            onOpen={() => setOpenCards(false)}
          />
          <DataSelector
            label="Cartes"
            source={require("../../../assets/icons/cardholder_theme.png")}
            items={cardsItems}
            onChange={(newValues) => {
              setSharedValues({
                ...sharedValues,
                profil: newValues.map((nv) => nv.toLocaleString()),
              });
            }}
            open={openCards}
            setOpen={setOpenCards}
            onOpen={() => setOpenProfil(false)}
          />
        </Container>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    color: "#C1C1C1",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
