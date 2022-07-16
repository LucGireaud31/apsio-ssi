import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProfil } from "./types/profil";

//////////////////////
///// Set Profil /////
//////////////////////

export async function getProfil():Promise<IProfil>{
    const profil = await AsyncStorage.getItem("profil");

    return profil ? JSON.parse(profil) : null
}

export async function setProfil(profil:IProfil){
    await AsyncStorage.setItem("profil",JSON.stringify(profil));
}