import { ReactNode } from "react";
import { View, StyleSheet, Text } from "react-native";
import QRCode from "react-qr-code";
import { useLocalApi } from "../../hooks/useLoacalApi";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";
import SkeletonContent from "react-native-skeleton-content";
import { Loader } from "../shared/Loader";

interface GenerateQRCodeProps {
  onQuit(): void;
  getJSON(): Promise<{
    [key: string]: any;
  }>;
}

export function GenerateQRCode(props: GenerateQRCodeProps) {
  const { onQuit, getJSON } = props;

  const { data, isLoading } = useLocalApi({ promise: () => getJSON() });

  return (
    <Container style={styles.container} label="Faire scanner ce QR Code" fix>
      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>
          <Bold>ATTENTION !</Bold>
        </Text>
        <Text style={styles.warningText}>
          Quiconque aura accès à ce Qr Code pourra voir
          <Bold> VOS DONNÉES</Bold> sélectionnées précédemment
        </Text>
      </View>
      {isLoading ? (
        <Loader label="Génération du Qr Code..." style={{ height: 250 }} />
      ) : (
        <View style={styles.qrCodeContainer}>
          <QRCode value={JSON.stringify(data)} size={250} />
        </View>
      )}
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
  warningContainer: {
    marginTop: 20,
  },
  warningText: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
  qrCodeContainer: {
    marginVertical: 35,
    alignItems: "center",
  },
  skeletonContainer: {
    width: 250,
    height: 250,
  },
  button: {
    width: 180,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
