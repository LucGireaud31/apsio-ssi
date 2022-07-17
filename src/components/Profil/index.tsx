import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native"
import { useLocalApi } from "../../src/hooks/useLoacalApi";
import { getProfil } from "../../localApi";
import { IProfil } from "../../src/types/profil";
import { Container } from "../Layout/Container";
import { RoundedTop } from "../Layout/RoundedTop";
import { DropDown } from "./DropDown";
import { Input } from "../shared/Input"

interface ProfilProps {
};

export function Profil(props: ProfilProps) {
    const { } = props;

    const { data: profil, isLoading } = useLocalApi<IProfil>({ promise: () => getProfil() })

    return (
        <View>
            <RoundedTop />
            <Image source={require("../../assets/profil.jpg")} style={styles.image} />
            {!isLoading &&
                <Container style={styles.container}>
                    <DropDown label="A propos de moi" icon={<Image style={styles.icon} source={require("../../assets/icons/user-list.png")} />} items={[
                        {
                            label: "Prénom", value: profil?.firstName ?? "",accessor:"firstName"
                        },
                        {
                            label: "Nom", value: profil?.lastName ?? "",accessor:"lastName"
                        },
                        {
                            label: "Date de naissance", value: profil?.dateOfBirth ?? "",accessor:"dateOfBirth"
                        },
                    ]} />
                    <Divider />
                    <DropDown label="Adresse" icon={<Image style={styles.icon} source={require("../../assets/icons/map-pin.png")} />} items={[
                        {
                            label: "Rue", value: profil?.address ?? "",accessor:"address"
                        },
                        {
                            label: "Complément", value: profil?.additional ?? "",accessor:"additional"
                        },
                        {
                            label: "Code postal", value: profil?.zipCode ?? "",accessor:"zipCode"
                        },
                        {
                            label: "Ville", value: profil?.city ?? "",accessor:"city"
                        },
                    ]} />
                    <Divider />
                    <DropDown label="Email" icon={<Image style={styles.icon} source={require("../../assets/icons/envelope-simple.png")} />} items={[
                        {
                            label: "Email", value: profil?.email ?? "",accessor:"email"
                        }
                    ]} />
                    <Divider />
                    <DropDown label="Téléphone" icon={<Image style={styles.icon} source={require("../../assets/icons/phone.png")} />} items={[
                        {
                            label: "Téléphone", value: profil?.phone ?? "",accessor:"phone"
                        },
                    ]} />
                    <Divider />
                    <DropDown label="Sexe" icon={<Image style={styles.icon} source={require("../../assets/icons/gender-intersex.png")} />} items={[
                        {
                            label: "Sexe", value: profil?.sexe ?? "",accessor:"sexe"
                        },

                    ]} />
                </Container>}
        </View>
    );
}

function Divider() {
    return <View style={styles.divider} />
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
    }, divider: {
        backgroundColor: "#00000015",
        height: 1,
        width: "100%",
        marginVertical: 15
    },
    dropDownContent: {
        marginHorizontal: 47

    }
});
