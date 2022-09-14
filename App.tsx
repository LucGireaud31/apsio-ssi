import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Navigator } from "./Navigator";
import { atom } from "jotai";
import * as NavigationBar from "expo-navigation-bar";

export const atomIsConnected = atom(false);
export const atomClearPassword = atom("");

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
      <Toast />
    </>
  );
}
