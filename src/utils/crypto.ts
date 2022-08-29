import AsyncStorage from "@react-native-async-storage/async-storage";
import {AES, enc} from "crypto-js";

export async function getItem(key: string, password: string) {
    
    const crypted = await AsyncStorage.getItem(key)
    if (!crypted) {
        return null;
    }

    return AES.decrypt(crypted, password).toString(enc.Utf8)
}
export async function setItem(key: string,value:string, password: string) {

    const cipherText = AES.encrypt(value, password).toString()
    AsyncStorage.setItem(key,cipherText)
}