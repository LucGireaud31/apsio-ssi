import { BarCodeScanner } from "expo-barcode-scanner";
import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Loader } from "../shared/Loader";

interface CameraProps {
  handleSendData(d: any): void;
}

export function Camera(props: CameraProps) {
  const { handleSendData } = props;

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 200);

  return (
    <>
      <View style={styles.container}>
        {isLoading ? (
          <Loader
            label="Connexion à l'appreil photo..."
            style={{ height: 250 }}
          />
        ) : (
          <View style={styles.cameraContainer}>
            <BarCodeScanner
              onBarCodeScanned={handleSendData}
              style={styles.camera}
            />
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "center",
    flex: 1,
  },
  cameraContainer: {
    height: 250,
    width: 250,
    overflow: "hidden",
    borderRadius: 20,
  },
  camera: {
    width: "100%",
    height:
      (Dimensions.get("screen").height / Dimensions.get("screen").width) * 200,
  },
});
