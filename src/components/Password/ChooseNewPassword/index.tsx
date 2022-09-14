import { useSetAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, Image, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { atomIsConnected } from "../../../../App";
import { saveHashedPassword } from "../../../../localApi";
import { Button } from "../../shared/Button";
import { InputPassword } from "./InputPassword";
import * as NavigationBar from "expo-navigation-bar";
import { theme } from "../../../styles/color";

interface ChooseNewPasswordProps {
  onSubmit?(pswd: string): void;
}

export function ChooseNewPassword(props: ChooseNewPasswordProps) {
  const { onSubmit } = props;

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const refPassword2 = useRef<TextInput>(null);
  const [error, setError] = useState<string>("");

  const setIsConnected = useSetAtom(atomIsConnected);

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync("white");

    return () => {
      NavigationBar.setBackgroundColorAsync(theme);
    };
  }, []);

  async function handleSubmit() {
    if (password1.length != 4) {
      setError("Le mot de passe doit faire 4 chiffres");
      return;
    }
    if (password1 != password2) {
      setError("Les mots de passes ne correspondent pas");
      return;
    }
    setError("");

    if (onSubmit) {
      onSubmit(password1);
    } else {
      await saveHashedPassword(password1);
      setIsConnected(false);
    }

    Toast.show({
      type: "success",
      text1: "Mot de passe modifié avec succés",
      visibilityTime: 4000,
    });
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>
        Ce mot de passe sera utilisé pour crypter vos données, ne le perdez pas
        !
      </Text>
      <InputPassword
        onSubmit={() => {
          refPassword2.current?.focus();
        }}
        onChange={(newValue) => {
          setPassword1(newValue);
        }}
        maxLength={4}
        subTitle="4 chiffres"
        title="Mot de passe"
      />
      <InputPassword
        inputRef={refPassword2}
        onChange={(newValue) => {
          setPassword2(newValue);
        }}
        onSubmit={handleSubmit}
        maxLength={4}
        title="Retaper le mot de passe"
      />
      <Text style={styles.error}>{error}</Text>

      <Button onPress={handleSubmit}>Enregistrer</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingTop: 10,
    backgroundColor: "white",
    height: "100%",
  },
  title: { textAlign: "center", marginBottom: 60, color: "gray" },
  logo: {
    width: 130,
    height: 130,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  error: {
    color: "red",
    marginTop: -5,
    fontSize: 12,
    marginBottom: 50,
  },
});
