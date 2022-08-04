import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { theme } from "../../styles/color";
import DropDownPicker, { ValueType } from "react-native-dropdown-picker";

interface DataSelectorProps {
  label: string;
  source: any;
  onChange(values: ValueType[]): void;
  items: { label: string; value: string }[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOpen(): void;
  defaultValue: any[];
}

export function DataSelector(props: DataSelectorProps) {
  const {
    label,
    source,
    onChange,
    items,
    open,
    setOpen,
    onOpen,
    defaultValue,
  } = props;

  const [value, setValue] = useState(defaultValue);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={source} style={styles.icon} />
        <Text style={styles.text}>{label}</Text>
      </View>
      <DropDownPicker
        multiple
        open={open}
        onOpen={onOpen}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        style={styles.dropdown}
        onSelectItem={(items) => {
          onChange(items.map((i) => i.value));
        }}
        placeholder="Aucun élément sélectionné"
        mode="BADGE"
        dropDownContainerStyle={{
          zIndex: 10000,
          borderColor: theme,
          marginTop: 9,
          paddingTop: 9,
        }}
        badgeDotStyle={{ display: "none" }}
        closeOnBackPressed={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, height: 100 },
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
