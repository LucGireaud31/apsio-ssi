import { View, StyleSheet, Image } from "react-native"
import { Container } from "../Layout/Container";
import { RoundedTop } from "../Layout/RoundedTop";
import { DropDown } from "./DropDown";

interface ProfilProps {
};

const ITEMS = {
    about: [
        {
            label: "Prénom", value: "Luc"
        },
        {
            label: "Nom", value: "Gireaud"
        },
        {
            label: "Date de naissance", value: "07/06/2001"
        },
    ],
    address: [
        {
            label: "Rue", value: "2 allée régussol"
        },
        {
            label: "Complément d'adresse", value: "Bat A03"
        },
        {
            label: "Code postal", value: "31620"
        },
        {
            label: "Ville", value: "Castelnau d'estrétefonds"
        },
    ],
    mail: [
        {
            value: "luc.gireaud@gmail.com"
        }
    ],
    phone: [
        {
            value: "06 52 65 83 17"
        }
    ],
    sexe: [
        {
            value: "Tracteur"
        }
    ],


}

export function Profil(props: ProfilProps) {
    const { } = props;

    return (
        <View>
            <RoundedTop />
            <Image source={require("../../assets/profil.jpg")} style={styles.image} />
            <Container style={styles.container}>
                <DropDown label="A propos de moi" icon={<Image style={styles.icon} source={require("../../assets/icons/user-list.png")} />} items={ITEMS.about} />
                <DropDown label="Adresse" icon={<Image style={styles.icon} source={require("../../assets/icons/map-pin.png")} />} items={ITEMS.address} />
                <DropDown label="Mail" icon={<Image style={styles.icon} source={require("../../assets/icons/envelope-simple.png")} />} items={ITEMS.mail} />
                <DropDown label="Téléphone" icon={<Image style={styles.icon} source={require("../../assets/icons/phone.png")} />} items={ITEMS.phone} />
                <DropDown label="Sexe" icon={<Image style={styles.icon} source={require("../../assets/icons/gender-intersex.png")} />} items={ITEMS.sexe} />
            </Container>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: "center",
        marginTop: 20,
    },
    container: {
    },
    icon: {
        height: 32,
        width: 32
    }
});
