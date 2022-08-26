import {
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Image,
  Text,
  StyleProp,
} from "react-native";

interface DrawerItemProps {
  label: string;
  source: ImageSourcePropType;
  labelStyle?: StyleProp<any>;
  onPress(): void;
  style?: StyleProp<any>;
}

export function DrawerItem(props: DrawerItemProps) {
  const { label, labelStyle, onPress, source, style } = props;

  return (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={onPress}
    >
      <Image source={source} style={styles.icon} />
      <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 32,
    height: 32,
  },
  label: {
    marginLeft: 10,
    fontWeight: "bold",
  },
});
