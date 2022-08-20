import { View, StyleSheet, Text } from "react-native";
import { Button } from "../shared/Button";

interface ChooseNewPasswordProps {
  onSubmit(pswd: string): void;
}

export function ChooseNewPassword(props: ChooseNewPasswordProps) {
  const { onSubmit } = props;

  return (
    <View style={styles.container}>
      <Text>Choisir le nouveau mot de passe</Text>
      <Button onPress={() => onSubmit("0001")}>Enregistrer 0001</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
