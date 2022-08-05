import { StyleSheet, Text } from "react-native";
import { useLocalApi } from "../../hooks/useLoacalApi";
import { Container } from "../Layout/Container";
import Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import { theme } from "../../styles/color";
import { Button } from "../shared/Button";

interface CopyProps {
  getJSON(): Promise<{
    [key: string]: any;
  }>;
  onQuit(): void;
}

export function Copy(props: CopyProps) {
  const { getJSON, onQuit } = props;

  const { data, isLoading } = useLocalApi({ promise: () => getJSON() });
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      Clipboard.setString(JSON.stringify(data));
      setIsCopied(true);
    }
  }, [isLoading]);

  return (
    <Container style={styles.container} fix>
      {isCopied && (
        <>
          <Text style={styles.text}>
            Vos données ont été copiées dans le presse papier
          </Text>
          <Button style={styles.button} onPress={onQuit}>
            Quitter
          </Button>
        </>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, height: "103%" },
  text: {
    fontSize: 25,
    textAlign: "center",
    textAlignVertical: "center",
    flex: 1,
    color: theme,
    fontWeight: "bold",
  },
  button: {
    width: 180,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
