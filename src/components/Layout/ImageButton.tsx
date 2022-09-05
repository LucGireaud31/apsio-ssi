import {
  ImageSourcePropType,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from "react-native";

interface ImageButtonProps {
  source: ImageSourcePropType;
  onPress?(): void;
  style?: any;
  imageStyle?: any;
  size?: number;
  disable?: boolean;
}
export function ImageButton(props: ImageButtonProps) {
  const { source, onPress, style, imageStyle, disable } = props;

  const size = props.size ?? 32;

  const styles = StyleSheet.create({
    image: {
      width: size,
      height: size,
      ...imageStyle,
    },
    container: {
      position: "relative",
      ...style,
    },
    disable: {
      position: "absolute",
      height: size * 1.5,
      width: size * 1.5,
      backgroundColor: "#00000050",
      borderRadius: size,
      top: -size / 4,
      left: -size / 4,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      disabled={disable}
    >
      <Image source={source} style={styles.image} />
      {disable && <View style={styles.disable} />}
    </TouchableOpacity>
  );
}
