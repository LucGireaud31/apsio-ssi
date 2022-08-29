import { useSetAtom } from "jotai";
import { useRef, useState } from "react";
import { View, StyleSheet, Text, Image, TextInput } from "react-native";
import Toast from "react-native-toast-message";
import { atomIsConnected } from "../../../../App";
import { setPasswordToHash } from "../../../../localApi";
import { Button } from "../../shared/Button";
import { InputPassword } from "./InputPassword";

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

  async function handleSubmit(p1: string, p2: string) {
    if (p1.length != 4) {
      setError("Le mot de passe doit faire 4 chiffres");
      return;
    }
    if (p1 != p2) {
      setError("Les mots de passes ne correspondent pas");
      return;
    }
    setError("");

    if (onSubmit) {
      onSubmit(p1);
    } else {
      await setPasswordToHash(p1);
      setIsConnected(false);
    }

    Toast.show({
      type: "success",
      text1: "Mot de passe modifié avec succés",
      text2: "Reconnectez-vous",
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
        onSubmit={(value) => {
          setPassword1(value);
          refPassword2.current?.focus();
        }}
        maxLength={4}
        subTitle="4 chiffres"
        title="Mot de passe"
      />
      <InputPassword
        inputRef={refPassword2}
        onSubmit={(value) => {
          setPassword2(value);
          handleSubmit(password1, value);
        }}
        maxLength={4}
        title="Retaper le mot de passe"
      />
      <Text style={styles.error}>{error}</Text>

      <Button onPress={() => handleSubmit(password1, password2)}>
        Enregistrer
      </Button>
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
