import { SetSeed } from "./components/SetSeed";
import React from "react";
import { Home } from "./components/Home";
import {
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "./styles/color";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Set seed"
          options={{
            title: "Modifier seed",
            headerStyle: { backgroundColor: theme },
            headerTintColor: "white",
          }}
          component={SetSeed}
        />
        <Stack.Screen name="Home" component={Home} options={{
          title: "Scanner Apsio Keeper", headerStyle: { backgroundColor: theme },
          headerTintColor: "white",
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
