import { useState, useMemo } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getProfil, getCards } from "../../../localApi";
import { useLocalApi } from "../../hooks/useLoacalApi";
import { ICard } from "../../types/card";
import { IProfil } from "../../types/profil";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";
import { DataSelector } from "./DataSelector";

interface SelectDataViewProps {
  onNextStep(): void;
}

export function SelectDataView(props: SelectDataViewProps) {
  const { onNextStep } = props;

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

  if (!profil || !cards) return <></>;

  return (
    <Container style={styles.container} fix>
      <Text style={styles.text}>Sélectionner les informations à envoyer</Text>
      <View style={styles.dropDownContainer}>
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
      </View>
      <Button
        rightIcon={
          <Image
            source={require("../../../assets/icons/caret-right_white.png")}
            style={styles.rightIcon}
          />
        }
        onPress={onNextStep}
        style={styles.button}
      >
        Continuer
      </Button>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, height: "103%" },
  text: {
    color: "#C1C1C1",
  },
  icon: {
    width: 32,
    height: 32,
  },
  rightIcon: {
    width: 22,
    height: 22,
  },
  dropDownContainer: {
    flex: 1,
  },
  button: {
    marginTop: "100%",
  },
});
