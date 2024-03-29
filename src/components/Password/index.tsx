import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { atomClearPassword, atomIsConnected } from "../../../App";
import { saveHashedPassword, submitPassword } from "../../../localApi";
import { theme, themeLight } from "../../styles/color";
import { atomIsDataInvalidate } from "../Layout/Footer";
import { Button } from "../shared/Button";
import { HiddenPassword } from "./HiddenPassword";
import { NumberPad } from "./NumberPad";
import * as NavigationBar from "expo-navigation-bar";

interface PasswordProps {}

const MAX_LENGTH = 4;

export function Password(props: PasswordProps) {
  const {} = props;

  const setIsConnected = useSetAtom(atomIsConnected);
  const setClearPassword = useSetAtom(atomClearPassword);
  const setIsDataInvalidate = useSetAtom(atomIsDataInvalidate);

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
    const newPassword =
      password.length < MAX_LENGTH ? password + value : password;

    if (password.length + 1 == MAX_LENGTH) {
      // password full
      onSubmit(newPassword);
    }
    setPassword(newPassword);
  }

  async function onSubmit(pswd: string) {
    const result = await submitPassword(pswd);
    if (result) {
      setIsConnected(true);
      saveHashedPassword(pswd);
      setClearPassword(pswd);
      return;
    }

    Toast.show({
      type: "error",
      text1: "Mauvais mot de passe",
      text2: "Veuillez réessayer",
      visibilityTime: 4000,
    });
    setPassword("");
  }

  useEffect(() => {
    setIsDataInvalidate(true);

    NavigationBar.setBackgroundColorAsync("white");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>APSIO SSI</Text>
      <Text style={styles.myPassword}>Mon mot de passe</Text>
      <HiddenPassword length={password.length} max={MAX_LENGTH} />
      <Button
        onPress={() => onSubmit(password)}
        style={styles.button}
        fontWeight="bold"
      >
        Valider
      </Button>
      <NumberPad onChange={handleChange} />
    </SafeAreaView>
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
