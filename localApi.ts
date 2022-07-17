import { ICard } from './src/types/card';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProfil } from "./src/types/profil";

//////////////////////
/////// Profil ///////
//////////////////////

export async function getProfil(): Promise<IProfil | null> {

    const profil = await AsyncStorage.getItem("profil");

    try {

        return profil ? JSON.parse(profil) : null
    } catch (err) {
        AsyncStorage.setItem("profil", "");
    }
    return null
}

export async function setProfil(accessor: string, newValue: string) {
    const profil = await getProfil();

    const result: { [key: string]: any } = {}

    if (profil) {
        Object.entries(profil).map(([key, value]) => {
            result[key] = value
        })
    }

    result[accessor] = newValue
    AsyncStorage.setItem("profil", Object.keys(result).length > 0 ? JSON.stringify(result) : "");
}

//////////////////////
/////// Cards ////////
//////////////////////

export async function getCards(): Promise<{ [key: string]: ICard[] } | null> {

    const cards = await AsyncStorage.getItem("cards");

    try {

        return cards ? JSON.parse(cards) : null
    } catch (err) {
        AsyncStorage.setItem("cards", "");
    }
    return null
}

// export async function setCards(key: string, newCard: ICard) {
//     const cards = await getCards();

//     if (cards) {
//         cards[key] = newCard
//     }

//     AsyncStorage.setItem("cards", cards ? JSON.stringify(cards) : "");

// }
