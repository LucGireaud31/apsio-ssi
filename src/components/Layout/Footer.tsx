import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { theme } from "../../styles/color";
import { ImageButton } from "./ImageButton";
import { atom, useSetAtom } from "jotai";
import { sleep } from "../../utils/promise";

const LINKS = [
  {
    source: require("../../../assets/icons/arrows-down-up.png"),
    name: "Send",
  },
  {
    source: require("../../../assets/icons/cardholder.png"),
    name: "Cards",
  },
  {
    source: require("../../../assets/icons/bank.png"),
    name: "Banks",
    disable: true,
  },
  {
    source: require("../../../assets/icons/currency-eth.png"),
    name: "Cryptos",
    disable: true,
  },
  {
    source: require("../../../assets/icons/user.png"),
    name: "Profil",
  },
];

export const atomIsDataInvalidate = atom(true);

export function Footer({ navigation }: BottomTabBarProps) {
  const [visible, setVisible] = useState(true);

  const setIsDataInvalidate = useSetAtom(atomIsDataInvalidate);

  useEffect(() => {
    const onShow = Keyboard.addListener("keyboardDidShow", () =>
      setVisible(false)
    );
    const onHide = Keyboard.addListener("keyboardDidHide", async () => {
      await sleep(60);
      setVisible(true);
    });
    return () => {
      onShow.remove();
      onHide.remove();
    };
  }, []);

  if (!visible) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      {LINKS.map((link, i) => (
        <View
          key={i}
          style={{
            ...styles.iconButton,
            backgroundColor:
              i == navigation.getState().index ? "#FFFFFF3B" : "#ffffff00",
          }}
        >
          <ImageButton
            source={link.source}
            onPress={() => {
              if (link.name == "Send" && navigation.getState().index != 0)
                setIsDataInvalidate(true);
              navigation.navigate(link.name);
            }}
            disable={link.disable}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme,
    height: 60,
    flexDirection: "row",
    paddingTop: 5,
    justifyContent: "space-between",
    paddingHorizontal: 32,
  },
  iconButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    paddingHorizontal: 9,
    borderRadius: 25,
  },
});
