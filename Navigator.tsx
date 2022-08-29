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
import Toast from "react-native-toast-message";
import { useLocalApi } from "./src/hooks/useLoacalApi";
import { getPasswordHash, setPasswordToHash } from "./localApi";
import { Password } from "./src/components/Password";
import { LoadingPage } from "./src/components/LoadingPage";
import { atom, useAtomValue } from "jotai";
import { ChooseNewPassword } from "./src/components/Password/ChooseNewPassword";
import { ImageButton } from "./src/components/Layout/ImageButton";
import { Drawer } from "./src/components/Drawer";
import { atomIsConnected } from "./App";
import { useNavigation } from "@react-navigation/native";

export function Navigator() {
  const Stack = createBottomTabNavigator();
  const StackBasic = createNativeStackNavigator();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { data: passwordData, isLoading } = useLocalApi<string>({
    promise: () => getPasswordHash(),
  });

  const navigation = useNavigation();

  const isConnected = useAtomValue(atomIsConnected);

  const [havePassword, setHavePassword] = useState(false);

  useEffect(() => {
    if (passwordData) {
      setHavePassword(true);
    }
  }, [passwordData]);

  function getHeaderStyle(
    title: string,
    hasDrawer: boolean = true,
    canGoBack: boolean = false
  ): any {
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
      ...(canGoBack && {
        headerLeft: () => (
          <ImageButton
            source={require("./assets/icons/back-arrow.png")}
            size={32}
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 30 }}
          />
        ),
      }),
    };
  }

  return !isLoading ? (
    !isConnected ? (
      <StackBasic.Navigator>
        {havePassword ? (
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
                  setHavePassword(true);
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
          setHavePassword(false);
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
          <Stack.Screen
            name="ModifyPassword"
            options={{
              ...getHeaderStyle("Modifier mot de passe", false, true),
            }}
            component={ChooseNewPassword}
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
  );
}
