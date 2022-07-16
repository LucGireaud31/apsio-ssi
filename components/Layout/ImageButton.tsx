import { ImageSourcePropType,TouchableOpacity,Image, StyleSheet } from "react-native";

interface ImageButtonProps {
    source: ImageSourcePropType,
    onPress(): void;
    style?:any,
    imageStyle?:any
}
export function ImageButton({ source, onPress,style,imageStyle }: ImageButtonProps) {


    
const styles = StyleSheet.create({
    image: {
        width: 32,
        height: 32,
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