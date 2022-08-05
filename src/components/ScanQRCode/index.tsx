import { BarCodeScanner } from "expo-barcode-scanner";
import React, { ReactNode, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocalApi } from "../../hooks/useLoacalApi";
import { theme } from "../../styles/color";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";
import Toast from "react-native-toast-message";

import {
  messageEncrypt,
  privateKey,
  publicKey,
  sharedKey,
} from "@waves/ts-lib-crypto";
import axios from "axios";
import { sleep } from "../../utils/promise";

interface ScanQRCodeProps {
  getJSON(): Promise<{
    [key: string]: any;
  }>;
  onQuit(): void;
}

export function ScanQRCode(props: ScanQRCodeProps) {
  const { getJSON, onQuit } = props;

  const { data: dataToShared } = useLocalApi({
    promise: () => getJSON(),
  });

  const [scanned, setScanned] = useState(false);

  async function handleSendData({ data }: any) {
    setScanned(true);
    if (scanned) return;

    const dataToSharedStr = JSON.stringify(dataToShared);

    if (data) {
      try {
        const { url, publicKey: externalPublicKey } = JSON.parse(data); // Peut catch

        try {
          const sharedKeyA = sharedKey(
            privateKey(dataToSharedStr),
            externalPublicKey,
            "ssi-apsio"
          );
          const encrypted = JSON.stringify(
            Object.values(messageEncrypt(sharedKeyA, dataToSharedStr))
          );
          const body = {
            publicKey: publicKey(dataToSharedStr),
            encrypted: encrypted,
          };
          try {
            await axios.post(url, body);
            Toast.show({
              type: "success",
              text1: "Envoyées",
              text2: "Vos données ont été envoyées avec succès !",
            });
          } catch (err) {
            console.log(err);
          }
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Erreur",
          text2: "QR Code invalide",
          visibilityTime: 3000,
        });
        await sleep(3000);
        setScanned(false);
      }
    }
  }

  const dynamicStyle = StyleSheet.create({
    camera: {
      overflow: "hidden",
      flex: 1,
      borderRadius: 20,
      paddingVertical: 0,
      marginVertical: 35,
      backgroundColor: scanned ? "red" : theme,
    },
  });

  return (
    <Container style={styles.container} label="Scanner le QR Code" fix>
      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>
          <Bold>ATTENTION !</Bold>
        </Text>
        <Text style={styles.warningText}>
          Lorsque vous scannez un QR Code, vos données précédemment
          sélectionnées <Bold>seront envoyées</Bold>
        </Text>
      </View>
      <View style={dynamicStyle.camera}>
        <BarCodeScanner onBarCodeScanned={handleSendData} style={{ flex: 1 }} />
      </View>
      <Button style={styles.button} onPress={onQuit}>
        Quitter
      </Button>
    </Container>
  );
}

function Bold({ children }: { children: ReactNode }) {
  return (
    <Text
      style={{
        fontWeight: "bold",
      }}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, height: "103%" },
  button: {
    width: 180,
    marginLeft: "auto",
    marginRight: "auto",
  },
  camera: {
    overflow: "hidden",
    flex: 1,
    borderRadius: 20,
    paddingVertical: 0,
    marginVertical: 35,
    backgroundColor: theme,
  },
  warningContainer: {
    marginTop: 20,
  },
  warningText: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
});
