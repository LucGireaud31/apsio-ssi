import { ReactNode, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { theme } from "../../styles/color";
import DropDownPicker from "react-native-dropdown-picker";

interface DataSelectorProps {
  label: string;
  source: any;
}

export function DataSelector(props: DataSelectorProps) {
  const { label, source } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={source} style={styles.icon} />
        <Text style={styles.text}>{label}</Text>
      </View>
      <DropDownPicker
        multiple
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
        placeholder="Aucun élément sélectionné"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  icon: {
    width: 32,
    height: 32,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: theme,
    marginLeft: 10,
  },
  dropdown: {
    marginTop: 10,
    borderColor: theme,
  },
});
