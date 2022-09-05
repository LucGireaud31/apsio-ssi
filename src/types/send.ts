import { ItemType } from "react-native-dropdown-picker";

export type SharedValuesType = {
    profil: ItemType<any>[];
    cards: ItemType<any>[];
};
  
export type SendType = "generate" | "scan" | "copy";
