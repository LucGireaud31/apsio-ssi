import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProfil } from "./types/profil";

//////////////////////
///// Set Profil /////
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