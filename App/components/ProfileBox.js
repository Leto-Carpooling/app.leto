import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { Avatar } from "./Avatar";

export const ProfileBox = ({ toProfile, signout }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.avatarContainer}
                onPress={toProfile}
            >
                <Avatar size={50} />
                <View style={styles.avatarTxtContainer}>
                    <Text style={styles.nameStyle}>John Doe</Text>
                    <Text style={styles.emailStyle}>john.doe@gmail.com</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={signout}>
                <MaterialIcons
                    name="logout"
                    size={17}
                    color={colors.textDarker}
                />
                <View style={styles.btnTextContainer}>
                    <Text style={styles.btnText}>Sign out</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.faintWhite,
        backgroundColor: colors.faintWhite,
        marginHorizontal: 10,
        padding: 0,
        marginTop: 5,
        borderRadius: 10,
    },
    button: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 13,
        paddingHorizontal: 15,
        marginTop: 10,
        borderRadius: 10,
        marginBottom: 1,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.divider,
        backgroundColor: colors.faintWhite,
    },
    btnTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        fontFamily: "Inter_500Medium",
        color: colors.textDarker,
        fontSize: 16,
    },
    avatarContainer: {
        flexDirection: "row",
        alignItems: "center",
        fontFamily: "Inter_400Regular",
        padding: 10,
    },
    nameStyle: {
        fontFamily: "Inter_400Regular",
        fontSize: 20,
        color: colors.textDarker,
    },
    emailStyle: {
        fontFamily: "Inter_500Medium",
        color: colors.textLighter,
    },
    avatarTxtContainer: {
        marginLeft: 10,
    },
});
