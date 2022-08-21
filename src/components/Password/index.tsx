import { useSetAtom } from "jotai";
import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { atomIsConnected } from "../../../App";
import { setPasswordToHash, submitPassword } from "../../../localApi";
import { theme, themeLight } from "../../styles/color";
import { Button } from "../shared/Button";
import { HiddenPassword } from "./HiddenPassword";
import { NumberPad } from "./NumberPad";

interface PasswordProps {}

export function Password(props: PasswordProps) {
  const {} = props;

  const setIsConnected = useSetAtom(atomIsConnected);

  const [password, setPassword] = useState("");

  function handleChange(value: string | "cancel" | "fingerprint") {
    if (value == "cancel") {
      setPassword((pswd) => pswd.substring(0, pswd.length - 1));
      return;
    }
    if (value == "fingerprint") {
      return;
    }

    // value is number
    setPassword((pswd) => pswd + value);
  }

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>APSIO SSI</Text>
      <Text style={styles.myPassword}>Mon mot de passe</Text>
      <HiddenPassword password={password} />
      <Button
        onPress={async () => {
          const result = await submitPassword(password);
          if (result) {
            setIsConnected(true);
            setPasswordToHash(password);
            return;
          }
          console.log("Mauvais mdp !");
        }}
        style={styles.button}
        fontWeight="bold"
      >
        Valider
      </Button>

      <NumberPad onChange={handleChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: theme, height: "100%", alignItems: "center" },
  logo: {
    width: 60,
    height: 60,
    marginTop: 60,
    borderRadius: 50,
  },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  myPassword: {
    color: "white",
    marginTop: 50,
  },
  button: {
    backgroundColor: themeLight,
    width: "60%",
    marginTop: 20,
    marginBottom: 100,
  },
});
