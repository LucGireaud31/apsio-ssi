import { useEffect, useState } from "react";
import { View, Text, TextInput,StyleSheet , Pressable } from "react-native";
import { theme } from "../../styles/color";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export function SetSeed() {
  const [seed, setSeed] = useState("");
  const navigation = useNavigation();
  function handleChange(text: string) {
    setSeed(text);
  }

  useEffect(() => {
    (async () => {
      const tempsSeed = await AsyncStorage.getItem("seed");
      if(tempsSeed){
        setSeed(tempsSeed);
      }
    })();
  }, []);

  async function handleSave(){
    AsyncStorage.setItem("seed",seed);

    // @ts-ignore
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <TextInput
      style={styles.input}
        onChangeText={handleChange}
        value={seed}
        placeholder="Entrez votre seed"
        onSubmitEditing={handleSave}
      />
      <Pressable style={styles.button} onPress={handleSave}><Text style={{color:"white"}}>Enregistrer</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width:300,
        alignItems:"center",
        marginLeft:"auto",
        marginRight:"auto"
    },
    input: {
        borderWidth:1,
        borderColor:theme,
        padding:10,
        width:"100%",
        color:theme,
        marginTop:40
        
    },
    header:{
        fontSize:20,
        marginTop:20,
        marginBottom:100,
        color:theme
    },
    button:{
        width:"100%",
        backgroundColor:theme,
        alignItems:"center",
        paddingVertical:10,
        marginTop:20
    }
  });
