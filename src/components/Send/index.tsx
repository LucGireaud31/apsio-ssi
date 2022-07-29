import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Container } from "../Layout/Container";
import { RoundedTop } from "../Layout/RoundedTop";
import { DataSelector } from "./DataSelector";
import { DisplayStep } from "./DisplayStep";

interface SendProps {}

export function Send(props: SendProps) {
  const {} = props;

  const [step, setStep] = useState(0);

  return (
    <View style={styles.container}>
      <RoundedTop />
      <DisplayStep steps={3} step={step} />
      <Container style={{ marginTop: 20 }} fix>
        <Text style={styles.text}>Sélectionner les informations à envoyer</Text>
        <DataSelector
          label="Profil"
          source={require("../../../assets/icons/user_theme.png")}
        />
      </Container>
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
