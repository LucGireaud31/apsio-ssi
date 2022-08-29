import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Navigator } from "./Navigator";
import { atom } from "jotai";

export const atomIsConnected = atom(false);

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
