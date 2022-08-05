import { BarCodeScanner } from "expo-barcode-scanner";
import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import { Loader } from "../shared/Loader";

interface CameraProps {
  handleSendData(d: any): void;
  style: any;
}

export function Camera(props: CameraProps) {
  const { handleSendData, style } = props;

  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => setIsLoading(false), 200);

  if (isLoading) {
    return <Loader label="Connexion à l'appreil photo..." />;
  }

  return (
    <View style={style}>
      <BarCodeScanner onBarCodeScanned={handleSendData} style={{ flex: 1 }} />
    </View>
  );
}
