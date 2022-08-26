import { View, StyleSheet, Text } from "react-native";

interface LoadingPageProps {}

export function LoadingPage(props: LoadingPageProps) {
  const {} = props;

  return (
    <View style={styles.container}>
      <Text>Chargement...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", height: "100%" },
});
