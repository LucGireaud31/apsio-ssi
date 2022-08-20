import { StyleSheet, Image, TouchableHighlight } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ExpoFileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { getProfilPicture, setProfilPicture } from "../../../localApi";
import { useLocalApi } from "../../hooks/useLoacalApi";

interface ProfilPictureUploadProps {
  size: number;
  style: any;
}

interface IFile {
  mimeType: string;
  name: string;
  size: number;
  type: string;
  uri: string;
}

export function ProfilPictureUpload(props: ProfilPictureUploadProps) {
  const { size, style } = props;

  const [image, setImage] = useState<null | string>();

  const { data: profilPicture, isLoading } = useLocalApi<string>({
    promise: getProfilPicture,
  });

  useEffect(() => {
    if (profilPicture) {
      setImage(profilPicture);
    }
  }, [isLoading]);

  return (
    <TouchableHighlight
      style={{
        ...styles.container,
        width: size,
        height: size,
        borderRadius: size / 2,
        ...style,
      }}
      onPress={async () => {
        const file = (await DocumentPicker.getDocumentAsync({
          type: ["image/jpeg", "image/png"],
        })) as IFile;

        if (file) {
          setImage(file.uri);
          setProfilPicture(file.uri);
        }
      }}
      underlayColor="#EBEBEB"
    >
      {image ? (
        <Image
          source={{ uri: image }}
          style={{
            ...styles.image,
            height: size,
            width: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <Image
          source={require("../../../assets/icons/upload-simple.png")}
          style={{
            ...styles.image,
            height: size / 2.2,
            width: size / 2.2,
          }}
        />
      )}
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignSelf: "center",
  },
  image: {
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
});
