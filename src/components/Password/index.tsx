import { useSetAtom } from "jotai";
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

  const passwd = "0001";

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>APSIO SSI</Text>
      <Text style={styles.myPassword}>Mon mot de passe</Text>
      <HiddenPassword password={passwd} />
      <Button
        onPress={async () => {
          const result = await submitPassword(passwd);
          if (result) {
            setIsConnected(true);
            setPasswordToHash(passwd);
            return;
          }
          console.log("Mauvais mdp !");
        }}
        style={styles.button}
        fontSize={17}
        fontWeight="bold"
      >
        Valider
      </Button>

      <NumberPad />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: theme, height: "100%", alignItems: "center" },
  logo: {
    width: 100,
    height: 100,
    marginTop: 60,
    borderRadius: 50,
  },
  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  myPassword: {
    color: "white",
    marginTop: 50,
  },
  button: {
    backgroundColor: themeLight,
    width: "60%",
    height: 60,
    marginTop: 20,
    marginBottom: 40,
  },
});
