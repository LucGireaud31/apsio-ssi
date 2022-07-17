import { View, StyleSheet, Image } from "react-native"
import { theme } from "../../styles/color";

interface RoundedTopProps{
};

export function RoundedTop(props:RoundedTopProps) {
const {} = props;

return (
<View style={styles.container}></View>

);
}

const styles = StyleSheet.create({
    container:{
        width: 300,
        height: 300,
        borderRadius: 300 / 2,transform:[{scaleX:2.2}],
        backgroundColor:theme,
        position:"absolute",
        top:-220,
        left:60
    }
});