import { ReactNode } from "react";
import { View, StyleSheet, Text } from "react-native";
import QRCode from "react-qr-code";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";

interface GenerateQRCodeProps {
  onQuit(): void;
  data: string;
}

export function GenerateQRCode(props: GenerateQRCodeProps) {
  const { onQuit, data } = props;

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
      <View style={styles.qrCodeContainer}>
        <QRCode value={data} size={250} />
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
  warningContainer: {
    marginTop: 20,
  },
  warningText: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 180,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
