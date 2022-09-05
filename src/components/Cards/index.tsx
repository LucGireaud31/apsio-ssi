import { View } from "react-native";
import { RoundedTop } from "../Layout/RoundedTop";
import HorizontalScrollMenu from "@nyashanziramasanga/react-native-horizontal-scroll-menu/src";
import { useState } from "react";
import { theme } from "../../styles/color";
import { CardSelector } from "./CardSelector";

interface CardsProps {}

const navigationTabs = [
  {
    id: 0,
    name: "Carte bleue",
  },
  {
    id: 1,
    name: "Carte d'identité",
  },
];

export function Cards(props: CardsProps) {
  const {} = props;

  const [selectedMenu, setSelectedMenu] = useState(0);

  return (
    <View>
      <RoundedTop />
      <View>
        <HorizontalScrollMenu
          items={navigationTabs}
          onPress={(route) => setSelectedMenu(route.id)}
          selected={selectedMenu}
          itemWidth={150}
          activeBackgroundColor="white"
          activeTextColor={theme}
          buttonStyle={{ borderWidth: 0 }}
          textStyle={{ color: "white" }}
        />
      </View>
      <CardSelector menu={selectedMenu} />
    </View>
  );
}
