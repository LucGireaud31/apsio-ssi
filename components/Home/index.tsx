import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Pressable, ScrollView, ScrollViewBase } from "react-native";
import {
  bytesToString,
  messageEncrypt,
  privateKey,
  publicKey,
  sharedKey,
} from "@waves/ts-lib-crypto";
import { theme } from "../../styles/color";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const navigate = useNavigation();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [message, setMessage] = useState("");

  const [dataSent, setDataSent] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function handleSendData({ type, data }: any) {
    setScanned(true);

    if (data) {
      try {
        const { url, publicKey: webKeeperKey } = JSON.parse(data); // Peut catch
        const seed = await AsyncStorage.getItem("seed");

        if (seed) {
          try {
            const sharedKeyA = sharedKey(
              privateKey(seed),
              webKeeperKey,
              "apsiocoin"
            );
            const encrypted = JSON.stringify(
              Object.values(messageEncrypt(sharedKeyA, seed))
            );
            const body = {
              publicKey: publicKey(seed),
              encrypted: encrypted,
            };
            try {
              await axios.post(url, body);
              setMessage("Envoyé !");
              setDataSent(true);
            } catch (err) {
              console.log(err)
              setMessage(
                "Erreur lors de l'envoi de la seed à url:" +
                  url +
                  " | body:" +
                  JSON.stringify(body)
              );
            }
          } catch (err) {
            console.error(err);
            setMessage("Erreur lors de l'encryptage de la clé");
          }
        } else {
          setMessage("Pas de seed");
        }
      } catch (err) {
        setMessage("Qr code invalid");
        setDataSent(false);
      }
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return  <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleSendData}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{message}</Text>

      {scanned && (
        <Pressable
          style={styles.buttonRescan}
          onPress={() => {
            setScanned(false);
            setDataSent(false);
            setMessage("");
          }}
        >
          <Text style={{ color: "white" }}>Rescanner</Text>
        </Pressable>
      )}
    </View>
}

const styles = StyleSheet.create({
  buttonSend: {
    width: "50%",
    borderRadius: 7,
    backgroundColor: theme,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonRescan: {
    width: "50%",
    borderRadius: 7,
    backgroundColor: theme,
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: theme,
  },
});
