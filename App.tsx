import React from "react";
import { Home } from "./components/Home";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { theme } from "./src/styles/color";
import { Footer } from "./components/Layout/Footer";
import { Profil } from "./components/Profil";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Cards } from "./components/Cards";
import { Banks } from "./components/Banks";
import { Send } from "./components/Send";
import { Cryptos } from "./components/Cryptos";


export default function App() {
  const Stack = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Send" tabBar={props => <Footer {...props} />}>
        <Stack.Screen name="Send" component={Send} options={{
          title: "Envoyer mes données", headerStyle: { backgroundColor: theme },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShadowVisible: false
        }} />
        <Stack.Screen name="Cards" component={Cards} options={{
          title: "Mes cartes", headerStyle: { backgroundColor: theme },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShadowVisible: false
        }} />
        <Stack.Screen name="Banks" component={Banks} options={{
          title: "Banque", headerStyle: { backgroundColor: theme },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShadowVisible: false
        }} />
        <Stack.Screen name="Cryptos" component={Cryptos} options={{
          title: "Blockchains", headerStyle: { backgroundColor: theme },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShadowVisible: false
        }} />
        <Stack.Screen name="Profil" component={Profil} options={{
          title: "Luc Gireaud", headerStyle: { backgroundColor: theme },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShadowVisible: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
