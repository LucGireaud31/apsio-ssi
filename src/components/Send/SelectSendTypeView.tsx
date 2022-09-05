import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import { SendType } from "../../types/send";
import { Container } from "../Layout/Container";
import { Button } from "../shared/Button";

interface SelectSendTypeViewProps {
  onNextStep(v: SendType): void;
}

const BUTTONS: {
  label: string;
  value: SendType;
  icon: ImageSourcePropType;
  withoutCaret?: boolean;
}[] = [
  {
    label: "Générer QR Code",
    value: "generate",
    icon: require("../../../assets/icons/qr-code.png"),
  },
  {
    label: "Scanner QR Code",
    value: "scan",
    icon: require("../../../assets/icons/scan.png"),
  },
  {
    label: "Copier les données",
    value: "copy",
    icon: require("../../../assets/icons/copy.png"),
    withoutCaret: true,
  },
];

export function SelectSendTypeView(props: SelectSendTypeViewProps) {
  const { onNextStep } = props;

  return (
    <Container
      style={styles.container}
      label="Choisir le mode de diffusion"
      fix
    >
      {BUTTONS.map((button, i) => (
        <Button
          key={i}
          leftIcon={<Image source={button.icon} style={styles.leftIcon} />}
          onPress={() => {
            onNextStep(button.value);
          }}
          {...(!button.withoutCaret && {
            rightIcon: (
              <Image
                source={require("../../../assets/icons/caret-right_white.png")}
                style={styles.rightIcon}
              />
            ),
          })}
          style={styles.button}
          fontSize={18}
        >
          {button.label}
        </Button>
      ))}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, height: "103%" },
  leftIcon: {
    width: 32,
    height: 32,
  },
  rightIcon: {
    width: 22,
    height: 22,
  },
  button: {
    marginTop: 80,
    height: 45,
  },
});
