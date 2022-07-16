import { ImageSourcePropType,TouchableOpacity,Image, StyleSheet } from "react-native";

interface ImageButtonProps {
    source: ImageSourcePropType,
    onPress?(): void;
    style?:any,
    imageStyle?:any,
    size?:number
}
export function ImageButton(props: ImageButtonProps) {
    
const { source, onPress,style,imageStyle ,size} = props;

const styles = StyleSheet.create({
    image: {
        width: size ?? 32,
        height: size ?? 32,
        ...imageStyle
    },
    container:{
        ...style
    }
})

    return <TouchableOpacity onPress={onPress} style={styles.container} >
        <Image
            source={source}
            style={styles.image} />
    </TouchableOpacity>
}