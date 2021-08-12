import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { Avatar } from "./Avatar";
import { Log } from "../util/Logger";

export const ProfileBox = ({ toProfile, signout, user }) => {
    //Log("ProfileBox:10", user);
    const fullName = `${user.firstname} ${user.lastname}`;
    const maxlimit = 14;
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.avatarContainer}
                onPress={toProfile}
            >
                <Avatar size={50} src={user.profileImage} />
                <View style={styles.avatarTxtContainer}>
                    <Text style={styles.nameStyle} numberOfLines={1}>
                        {/* {fullName.length > maxlimit
                            ? fullName.substring(0, maxlimit - 3) + "..."
                            : fullName} */}
                        {fullName}
                    </Text>
                    <Text style={styles.emailStyle} numberOfLines={1}>
                        {user.email}
                    </Text>
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
        flex: 1,
        marginRight: 50,
        color: colors.textDarker,
    },
    emailStyle: {
        fontFamily: "Inter_500Medium",
        flex: 1,
        marginRight: 50,
        color: colors.textLighter,
    },
    avatarTxtContainer: {
        marginLeft: 10,
    },
});
