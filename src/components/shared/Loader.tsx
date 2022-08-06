import { View, StyleSheet, Text } from "react-native";

interface LoaderProps {
  style?: any;
  label: string;
}

export function Loader(props: LoaderProps) {
  const { style, label } = props;

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      padding: 30,
      marginVertical: 35,
      borderRadius: 20,
      backgroundColor: "#F0F0F0",
      justifyContent: "center",
      ...style,
    },
    text: {
      textAlign: "center",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}
