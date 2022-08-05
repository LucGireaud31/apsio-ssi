import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./src/styles/color";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Banks } from "./src/components/Banks";
import { Cards } from "./src/components/Cards";
import { Cryptos } from "./src/components/Cryptos";
import { Footer } from "./src/components/Layout/Footer";
import { Profil } from "./src/components/Profil";
import { Send } from "./src/components/Send";
import Toast from "react-native-toast-message";

export default function App() {
  const Stack = createBottomTabNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Send"
          tabBar={(props) => <Footer {...props} />}
        >
          <Stack.Screen
            name="Send"
            component={Send}
            options={{
              title: "Envoyer mes données",
              headerStyle: { backgroundColor: theme },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Cards"
            component={Cards}
            options={{
              title: "Mes cartes",
              headerStyle: { backgroundColor: theme },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Banks"
            component={Banks}
            options={{
              title: "Banque",
              headerStyle: { backgroundColor: theme },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Cryptos"
            component={Cryptos}
            options={{
              title: "Blockchains",
              headerStyle: { backgroundColor: theme },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Profil"
            component={Profil}
            options={{
              title: "Luc Gireaud",
              headerStyle: { backgroundColor: theme },
              headerTintColor: "white",
              headerTitleAlign: "center",
              headerShadowVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
