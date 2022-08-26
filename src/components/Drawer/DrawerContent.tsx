import { View, StyleSheet, Image, Text } from "react-native";
import { DrawerItem } from "./DrawerItem";

interface DrawerContentProps {
  onClose(): void;
}

export function DrawerContent(props: DrawerContentProps) {
  const { onClose } = props;

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require("../../../assets/icon.png")}
          style={styles.logo}
        />

        <DrawerItem
          label="Déconnexion"
          onPress={() => {}}
          source={require("../../../assets/icons/sign-out.png")}
          labelStyle={{ color: "red" }}
          style={{ marginBottom: 20 }}
        />
        <DrawerItem
          label="Paramètres"
          onPress={() => {}}
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
