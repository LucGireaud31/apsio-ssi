import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import { View, StyleSheet, Image, Text } from "react-native";
import Toast from "react-native-toast-message";
import { atomIsConnected } from "../../../App";
import { removePassword } from "../../../localApi";
import { DrawerItem } from "./DrawerItem";

interface DrawerContentProps {
  onResetPassword(): void;
  onClose(): void;
}

export function DrawerContent({
  onResetPassword,
  onClose,
}: DrawerContentProps) {
  const setIsConnected = useSetAtom(atomIsConnected);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.logo}
        />

        <DrawerItem
          label="Déconnexion"
          onPress={() => {
            setIsConnected(false);

            Toast.show({
              type: "info",
              text1: "Déconnexion réussie",
              visibilityTime: 4000,
            });
            onClose();
          }}
          source={require("../../../assets/icons/sign-out.png")}
          labelStyle={{ color: "red" }}
          style={{ marginBottom: 20 }}
        />
        <DrawerItem
          label="Changer mot de passe"
          onPress={async () => {
            navigation.navigate("ModifyPassword" as any);
            // await removePassword();
            // setIsConnected(false);
            // onResetPassword();
            onClose();
          }}
          source={require("../../../assets/icons/lock.png")}
          labelStyle={{ color: "black" }}
          style={{ marginBottom: 20 }}
        />
        <DrawerItem
          label="Paramètres"
          onPress={() => {
            onClose();
          }}
          source={require("../../../assets/icons/setting.png")}
          labelStyle={{ color: "black" }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTextVersion}>APSIO SSI v1.0.0</Text>
        <Text style={styles.footerTextCreator}>Luc Gireaud</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  body: {
    flex: 1,
  },
  logo: {
    width: 130,
    height: 130,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  footer: {
    marginBottom: 15,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  footerTextVersion: {
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  footerTextCreator: {},
});
