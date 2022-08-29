import React, { useEffect, useState } from "react";
import { theme } from "./src/styles/color";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Banks } from "./src/components/Banks";
import { Cards } from "./src/components/Cards";
import { Cryptos } from "./src/components/Cryptos";
import { Footer } from "./src/components/Layout/Footer";
import { Profil } from "./src/components/Profil";
import { Send } from "./src/components/Send";
import { useLocalApi } from "./src/hooks/useLoacalApi";
import { getPasswordHash, setPasswordToHash } from "./localApi";
import { Password } from "./src/components/Password";
import { LoadingPage } from "./src/components/LoadingPage";
import { useAtomValue } from "jotai";
import { ChooseNewPassword } from "./src/components/Password/ChooseNewPassword";
import { ImageButton } from "./src/components/Layout/ImageButton";
import { Drawer } from "./src/components/Drawer";
import { atomIsConnected } from "./App";
import { SafeAreaView } from "react-native-safe-area-context";

export function Navigator() {
  const StackFooter = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { data: passwordData, isLoading } = useLocalApi<string>({
    promise: () => getPasswordHash(),
  });

  const isConnected = useAtomValue(atomIsConnected);

  const [havePassword, setHavePassword] = useState(false);

  useEffect(() => {
    if (passwordData) {
      setHavePassword(true);
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

  return !isLoading ? (
    !isConnected ? (
      <Stack.Navigator>
        {havePassword ? (
          <Stack.Screen
            options={{ header: () => <></> }}
            name="Password"
            component={() => <Password />}
          />
        ) : (
          <Stack.Screen
            name="ChooseNewPassword"
            options={{ ...getHeaderStyle("Nouveau mot de passe", false) }}
            component={() => (
              <ChooseNewPassword
                onSubmit={(password) => {
                  setHavePassword(true);
                  setPasswordToHash(password);
                }}
              />
            )}
          />
        )}
      </Stack.Navigator>
    ) : (
      <Drawer onClose={() => setIsOpenDrawer(false)} isOpen={isOpenDrawer}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{ header: () => <></> }}>
            {() => (
              <SafeAreaView style={{ height: "100%", backgroundColor: theme }}>
                <StackFooter.Navigator
                  tabBar={(props) => <Footer {...props} />}
                >
                  <StackFooter.Screen
                    name="Send"
                    component={Send}
                    options={{
                      ...getHeaderStyle("Envoyer mes données"),
                    }}
                  />
                  <StackFooter.Screen
                    name="Cards"
                    component={Cards}
                    options={{
                      ...getHeaderStyle("Mes cartes"),
                    }}
                  />
                  <StackFooter.Screen
                    name="Banks"
                    component={Banks}
                    options={{
                      ...getHeaderStyle("Banque"),
                    }}
                  />
                  <StackFooter.Screen
                    name="Cryptos"
                    component={Cryptos}
                    options={{
                      ...getHeaderStyle("Blockchains"),
                    }}
                  />
                  <StackFooter.Screen
                    name="Profil"
                    component={Profil}
                    options={{
                      ...getHeaderStyle("Mon profil"),
                    }}
                  />
                </StackFooter.Navigator>
              </SafeAreaView>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="ModifyPassword"
            options={{
              ...getHeaderStyle("Modifier mot de passe", false),
              animation: "slide_from_bottom",
            }}
            component={ChooseNewPassword}
          />
        </Stack.Navigator>
      </Drawer>
    )
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        options={{ header: () => <></> }}
        name="Loading"
        component={LoadingPage}
      />
    </Stack.Navigator>
  );
}
