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
import { getPasswordHash, setPasswordToHash } from "./localApi";
import { Password } from "./src/components/Password";
import { LoadingPage } from "./src/components/LoadingPage";
import { atom, useAtomValue } from "jotai";
import { ChooseNewPassword } from "./src/components/Password/ChooseNewPassword";
import { ImageButton } from "./src/components/Layout/ImageButton";
import { Drawer } from "./src/components/Drawer";

export const atomIsConnected = atom(false);

export default function App() {
  const Stack = createBottomTabNavigator();
  const StackBasic = createNativeStackNavigator();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

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

  function getHeaderStyle(title: string, hasDrawer: boolean = true): any {
    return {
      title,
      headerStyle: { backgroundColor: theme },
      headerTintColor: "white",
      headerTitleAlign: "center",
      headerShadowVisible: false,
      ...(hasDrawer && {
        headerRight: () => (
          <ImageButton
            source={require("./assets/icons/list.png")}
            size={32}
            onPress={() => setIsOpenDrawer(true)}
            style={{ marginRight: 30 }}
          />
        ),
      }),
    };
  }

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
                  options={{ ...getHeaderStyle("Nouveau mot de passe", false) }}
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
            <Drawer
              onClose={() => setIsOpenDrawer(false)}
              isOpen={isOpenDrawer}
              onResetPassword={() => {
                setPassword(null);
              }}
            >
              <Stack.Navigator
                initialRouteName="Send"
                tabBar={(props) => <Footer {...props} />}
              >
                <Stack.Screen
                  name="Send"
                  component={Send}
                  options={{
                    ...getHeaderStyle("Envoyer mes données"),
                  }}
                />
                <Stack.Screen
                  name="Cards"
                  component={Cards}
                  options={{
                    ...getHeaderStyle("Mes cartes"),
                  }}
                />
                <Stack.Screen
                  name="Banks"
                  component={Banks}
                  options={{
                    ...getHeaderStyle("Banque"),
                  }}
                />
                <Stack.Screen
                  name="Cryptos"
                  component={Cryptos}
                  options={{
                    ...getHeaderStyle("Blockchains"),
                  }}
                />
                <Stack.Screen
                  name="Profil"
                  component={Profil}
                  options={{
                    ...getHeaderStyle("Mon profil"),
                  }}
                />
              </Stack.Navigator>
            </Drawer>
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
