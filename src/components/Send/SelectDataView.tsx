import { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getProfil, getCards } from "../../../localApi";
import { useLocalApi } from "../../hooks/useLoacalApi";
import { theme } from "../../styles/color";
import { ICard } from "../../types/card";
import { IProfil } from "../../types/profil";
import { SharedValuesType } from "../../types/send";
import { Container } from "../Layout/Container";
import { atomIsDataInvalidate } from "../Layout/Footer";
import { Button } from "../shared/Button";
import { DataSelector } from "./DataSelector";
import { useAtom, useAtomValue } from "jotai";
import { french } from "../../utils/translate";
import { atomClearPassword } from "../../../App";

interface SelectDataViewProps {
  onNextStep(v: SharedValuesType): void;
  defaultSharedValues: SharedValuesType;
}

export function SelectDataView(props: SelectDataViewProps) {
  const { onNextStep, defaultSharedValues } = props;

  const [sharedValues, setSharedValues] =
    useState<SharedValuesType>(defaultSharedValues);

  const clearPassword = useAtomValue(atomClearPassword);

  const {
    data: profil,
    isLoading: isLoadingProfil,
    refetch: refetchProfil,
  } = useLocalApi<IProfil>({
    promise: () => getProfil(clearPassword),
    disableFirstFetch: true,
  });

  const {
    data: cards,
    isLoading: isLoadingCards,
    refetch: refetchCards,
  } = useLocalApi<{
    [key: string]: ICard[];
  } | null>({
    promise: () => getCards(clearPassword),
    disableFirstFetch: true,
  });

  const [isDataInvalidate, setIsDataInvalidate] = useAtom(atomIsDataInvalidate);

  useEffect(() => {
    if (isDataInvalidate) {
      refetchProfil();
      refetchCards();
      setIsDataInvalidate(false);
    }
  }, [isDataInvalidate]);

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

  const hasData = useMemo(
    () =>
      isLoadingCards ||
      isLoadingProfil ||
      profil ||
      (cardsItems && cardsItems.length != 0),
    [profil, cardsItems, isLoadingCards, isLoadingProfil]
  );

  return (
    <Container
      style={styles.container}
      label="Sélectionner les informations à envoyer"
      fix
    >
      {!hasData && <Text style={styles.text}>Aucune données enregistrées</Text>}
      {hasData && (
        <>
          <View style={styles.dropDownContainer}>
            {profil && (
              <DataSelector
                label="Profil"
                source={require("../../../assets/icons/user_theme.png")}
                items={Object.entries(profil).map((entry) => ({
                  label: `${french[entry[0]]} : ${entry[1]}`,
                  value: entry[0],
                }))}
                onChange={(newValues) => {
                  setSharedValues({
                    ...sharedValues,
                    profil: newValues,
                  });
                }}
                open={openProfil}
                setOpen={setOpenProfil}
                onOpen={() => setOpenCards(false)}
                defaultValue={sharedValues.profil}
              />
            )}
            {cardsItems && cardsItems.length > 0 && (
              <DataSelector
                label="Cartes"
                source={require("../../../assets/icons/cardholder_theme.png")}
                items={cardsItems}
                onChange={(newValues) => {
                  setSharedValues({
                    ...sharedValues,
                    cards: newValues,
                  });
                }}
                open={openCards}
                setOpen={setOpenCards}
                onOpen={() => setOpenProfil(false)}
                defaultValue={sharedValues.cards}
              />
            )}
          </View>
          <Button
            rightIcon={
              <Image
                source={require("../../../assets/icons/caret-right_white.png")}
                style={styles.rightIcon}
              />
            }
            onPress={() => {
              onNextStep(sharedValues);
            }}
            style={styles.button}
          >
            Continuer
          </Button>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, height: "103%" },
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
  text: {
    textAlign: "center",
    color: theme,
    fontSize: 18,
    marginTop: 50,
    fontWeight: "700",
  },
});
