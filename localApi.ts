import { ICard } from './src/types/card';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProfil } from "./src/types/profil";
import {SHA256,enc} from 'crypto-js';


//////////////////////
////// Password //////
//////////////////////

export async function getPasswordHash() {
    return AsyncStorage.getItem("passwordHash")
}

export async function submitPassword(password: string) {
    const realHashed = await getPasswordHash()
    return SHA256(password).toString(enc.Hex) == realHashed
}

export async function saveHashedPassword(password: string) {
    const hashed = SHA256(password).toString(enc.Hex)
    return AsyncStorage.setItem("passwordHash",hashed.toString())
}

export async function removePassword() {
    return AsyncStorage.removeItem("passwordHash")
}

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

export async function getSpecifiedCards(specified: string[]) {
    const cards = await AsyncStorage.getItem("cards");

    try {
        const currentCards = cards ? JSON.parse(cards) : null

        const specifiedCards: ICard[] = []
        
        specified.forEach(s => {
            const [type,index] = s.split("_")
            specifiedCards.push(currentCards[type][index])
        })
        return specifiedCards

    } catch (err) {
        AsyncStorage.setItem("cards", "");
    }
    return null
    
}

export async function addCard(menu: number) {
    let cards = await getCards();

    if (cards && cards[menu]) {
        cards[menu].push({})
    } else {

        let tempsCards: { [key: string]: ICard[] } = cards ?? {}
        tempsCards[menu] = [{}]
        cards = { ...tempsCards }
    }

    AsyncStorage.setItem("cards", cards ? JSON.stringify(cards) : "");

    return cards

}

export async function setCard(index: number, menu: number, newCard: ICard) {
    const cards = await getCards();

    if (cards) {
        cards[menu][index] = newCard
    }

    AsyncStorage.setItem("cards", cards ? JSON.stringify(cards) : "");
    return cards

}
export async function removeCard(index: number, menu: number) {
    const cards = await getCards();

    if (cards) {
        cards[menu] = cards[menu].filter((_,i)=>i != index)
    }

    AsyncStorage.setItem("cards", cards ? JSON.stringify(cards) : "");

}


//////////////////////
/// Profil picture ///
//////////////////////

export async function getProfilPicture() {
    return AsyncStorage.getItem("profilPicture")
}

export async function setProfilPicture(url:string) {
    return AsyncStorage.setItem("profilPicture",url)
}