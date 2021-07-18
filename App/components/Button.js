import React from "react";
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

export const Button = ({ onPress, text }) => {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.button}>
                <View style={styles.textHolder}>
                    <Text style={styles.btnTxt}>{text}</Text>
                </View>
                <MaterialIcons
                    name="arrow-forward-ios"
                    size={17}
                    style={styles.btnIcon}
                    color={colors.white}
                />
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        elevation: 7,
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 13,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 3,
    },
    textHolder: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    btnTxt: {
        color: colors.white,
        fontFamily: "Inter_500Medium",
        fontSize: 16,
    },
});
