import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import fonts from "../assets/fonts/fonts";

export const FileChooser = ({ label }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.attachedText}>No file chosen</Text>
            </View>
            <View style={styles.iconContainer}>
                <MaterialIcons
                    name="attach-file"
                    color={colors.primary}
                    size={30}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        elevation: 4,
        borderRadius: 5,
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontFamily: fonts.interRegular,
        fontSize: 20,
        color: colors.textDarker,
    },
    attachedText: {
        fontFamily: fonts.interMedium,
        fontSize: 14,
        color: colors.textLighter,
        marginTop: 8,
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    iconContainer: {
        padding: 20,
    },
});
