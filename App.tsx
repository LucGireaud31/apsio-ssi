import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { theme } from "./src/styles/color";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Banks } from "./src/components/Banks";
import { Cards } from "./src/components/Cards";
import { Cryptos } from "./src/components/Cryptos";
import { Footer } from "./src/components/Layout/Footer";
import { Profil } from "./src/components/Profil";
import { Send } from "./src/components/Send";
import Toast from "react-native-toast-message";
import { useLocalApi } from "./src/hooks/useLoacalApi";
import { getPasswordHash, setPasswordToHash, submitPassword } from "./localApi";
import { Password } from "./src/components/Password";
import { LoadingPage } from "./src/components/LoadingPage";
import { atom, useAtom, useAtomValue } from "jotai";
import { ChooseNewPassword } from "./src/components/Password/ChooseNewPassword";

export const atomIsConnected = atom(false);

export default function App() {
  const Stack = createBottomTabNavigator();
  const StackBasic = createNativeStackNavigator();

  const { data: passwordData, isLoading } = useLocalApi<string>({
    promise: () => getPasswordHash(),
  });

  const isConnected = useAtomValue(atomIsConnected);

  const [password, setPassword] = useState<null | string>(null);

  useEffect(() => {
    if (passwordData) {
      setPassword(passwordData);
    }
  }, [passwordData]);

  return (
    <>
      <NavigationContainer>
        {!isLoading ? (
          !isConnected ? (
            <StackBasic.Navigator>
              {password ? (
                <StackBasic.Screen
                  options={{ header: () => <></> }}
                  name="Password"
                  component={() => <Password />}
                />
              ) : (
                <StackBasic.Screen
                  name="ChooseNewPassword"
                  component={() => (
                    <ChooseNewPassword
                      onSubmit={(password) => {
                        setPassword(password);
                        setPasswordToHash(password);
                      }}
                    />
                  )}
                />
              )}
            </StackBasic.Navigator>
          ) : (
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
                  title: "Mon profil",
                  headerStyle: { backgroundColor: theme },
                  headerTintColor: "white",
                  headerTitleAlign: "center",
                  headerShadowVisible: false,
                }}
              />
            </Stack.Navigator>
          )
        ) : (
          <StackBasic.Navigator>
            <StackBasic.Screen
              options={{ header: () => <></> }}
              name="Loading"
              component={LoadingPage}
            />
          </StackBasic.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </>
  );
}
