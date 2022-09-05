import { ICard } from './src/types/card';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IProfil } from "./src/types/profil";
import {SHA256,enc} from 'crypto-js';
import { getItem, setItem } from './src/utils/crypto';


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

export async function getProfil(password:string): Promise<IProfil | null> {

    const profil = await getItem("profil",password);

    try {

        return profil ? JSON.parse(profil) : null
    } catch (err) {
        setItem("profil", "",password);
    }
    return null
}

export async function setProfil(accessor: string, newValue: string,password:string) {
    const profil = await getProfil(password);

    const result: { [key: string]: any } = {}

    if (profil) {
        Object.entries(profil).map(([key, value]) => {
            result[key] = value
        })
    }

    result[accessor] = newValue
    setItem("profil", Object.keys(result).length > 0 ? JSON.stringify(result) : "",password);
}

//////////////////////
/////// Cards ////////
//////////////////////

export async function getCards(password:string): Promise<{ [key: string]: ICard[] } | null> {
    const cards = await getItem("cards",password);

    try {
        return cards ? JSON.parse(cards) : null
    } catch (err) {
        setItem("cards", "",password);
    }
    return null
}

export async function getSpecifiedCards(specified: string[],password:string) {
    const cards = await getItem("cards",password);

    try {
        const currentCards = cards ? JSON.parse(cards) : null

        const specifiedCards: ICard[] = []
        
        specified.forEach(s => {
            const [type,index] = s.split("_")
            specifiedCards.push(currentCards[type][index])
        })
        return specifiedCards

    } catch (err) {
        setItem("cards", "",password);
    }
    return null
    
}

export async function addCard(menu: number,password:string) {
    let cards = await getCards(password);

    if (cards && cards[menu]) {
        cards[menu].push({})
    } else {

        let tempsCards: { [key: string]: ICard[] } = cards ?? {}
        tempsCards[menu] = [{}]
        cards = { ...tempsCards }
    }

    setItem("cards", cards ? JSON.stringify(cards) : "",password);

    return cards

}

export async function setCard(index: number, menu: number, newCard: ICard,password:string) {
    const cards = await getCards(password);

    if (cards) {
        cards[menu][index] = newCard
    }

    setItem("cards", cards ? JSON.stringify(cards) : "",password);
    return cards

}
export async function removeCard(index: number, menu: number,password:string) {
    const cards = await getCards(password);

    if (cards) {
        cards[menu] = cards[menu].filter((_,i)=>i != index)
    }

    setItem("cards", cards ? JSON.stringify(cards) : "",password);

}


//////////////////////
/// Profil picture ///
//////////////////////

export async function getProfilPicture(password:string) {
    return getItem("profilPicture",password)
}

export async function setProfilPicture(url:string,password:string) {
    return setItem("profilPicture",url,password)
}