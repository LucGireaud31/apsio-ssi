import { ReactNode } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";

interface ContainerProps {
  children: ReactNode;
  style?: any;
  fix?: boolean;
  label?: string;
}

export function Container(props: ContainerProps) {
  const { children, style, fix, label } = props;

  const styles = StyleSheet.create({
    container: {
      marginBottom: 130,
    },
    content: {
      backgroundColor: "white",
      borderRadius: 20,
      marginHorizontal: 25,
      marginVertical: 35,
      paddingHorizontal: 40,
      paddingVertical: 30,
      ...style,
    },
    text: {
      color: "#C1C1C1",
      textAlign: "center",
    },
  });

  if (fix) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {label && <Text style={styles.text}>{label}</Text>}
          {children}
        </View>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {label && <Text style={styles.text}>{label}</Text>}
        {children}
      </View>
    </ScrollView>
  );
}
