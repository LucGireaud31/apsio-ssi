import React from "react";
import { Home } from "./components/Home";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { theme } from "./styles/color";
import { Footer } from "./components/Layout/Footer";
import { Profil } from "./components/Profil";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const Stack = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator tabBar={props=><Footer {...props}/>}>
        {/* <Stack.Screen
          name="Set seed"
          options={{
            title: "Modifier seed",
            headerStyle: { backgroundColor: theme },
            headerTintColor: "white",
          }}
          component={SetSeed}
        /> */}
        <Stack.Screen name="Home" component={Home} options={{
          title: "Scanner Apsio Keeper", headerStyle: { backgroundColor: theme },
          headerTintColor: "white",
        }} />
        <Stack.Screen name="Profil" component={Profil} options={{
          title: "Luc Gireaud", headerStyle: { backgroundColor: theme },
          headerTintColor: "white",
          headerTitleAlign:"center",
          headerShadowVisible:false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
