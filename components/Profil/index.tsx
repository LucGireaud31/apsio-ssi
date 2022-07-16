import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native"
import { useLocalApi } from "../../hooks/useLoacalApi";
import { getProfil } from "../../localApi";
import { IProfil } from "../../types/profil";
import { Container } from "../Layout/Container";
import { RoundedTop } from "../Layout/RoundedTop";
import { DropDown } from "./DropDown";

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
                    <DropDown label="A propos de moi" icon={<Image style={styles.icon} source={require("../../assets/icons/user-list.png")} />} items={["Luc","Gireaud"]}>
                        <View style={styles.dropDownContent}>
                            {/* {items.map((item, i) => (
                                <Input key={i} label={item.label} defaultValue={item.value} />
                            ))} */}
                        </View>
                    </DropDown>
                    <Divider />
                    {/*
                <DropDown label="Adresse" icon={<Image style={styles.icon} source={require("../../assets/icons/map-pin.png")} />} items={profil.address} />
                <Divider />
                <DropDown label="Email" icon={<Image style={styles.icon} source={require("../../assets/icons/envelope-simple.png")} />} items={profil.mail} />
                <Divider />
                <DropDown label="Téléphone" icon={<Image style={styles.icon} source={require("../../assets/icons/phone.png")} />} items={profil.phone} />
                <Divider />
                <DropDown label="Sexe" icon={<Image style={styles.icon} source={require("../../assets/icons/gender-intersex.png")} />} items={profil.sexe} /> */}
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
    dropDownContent:{
        marginHorizontal: 47

    }
});
