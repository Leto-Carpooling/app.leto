import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import colors from "../assets/colors/colors";
import { MaterialIcons } from "@expo/vector-icons";

export const TextField = ({ iconName, theme, ...props }) => {
    let container, textField, iconColor, placeHolderTextColor;
    switch (theme) {
        case "danger":
            container = stylesDanger.container;
            textField = stylesDanger.textField;
            iconColor = colors.white;
            placeHolderTextColor = colors.white;
            break;
        case "success":
            container = stylesSuccess.container;
            textField = stylesSuccess.textField;
            iconColor = colors.white;
            placeHolderTextColor = colors.white;
            break;
        default:
            container = stylesNuetral.container;
            textField = stylesNuetral.textField;
            iconColor = colors.primary;
            placeHolderTextColor = colors.placeholderColor;
            break;
    }
    return (
        <View style={container}>
            <MaterialIcons name={iconName} size={30} color={iconColor} />
            <TextInput
                style={textField}
                {...props}
                placeholderTextColor={placeHolderTextColor}
            />
        </View>
    );
};

const stylesNuetral = StyleSheet.create({
    container: {
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        backgroundColor: colors.textField,
        alignItems: "center",
    },
    textField: {
        flex: 1,
        fontFamily: "Inter_500Medium",
        fontSize: 17,
        marginLeft: 10,
    },
});
const stylesDanger = StyleSheet.create({
    container: {
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        backgroundColor: colors.danger,
        alignItems: "center",
    },
    textField: {
        flex: 1,
        fontFamily: "Inter_500Medium",
        fontSize: 17,
        marginLeft: 10,
        color: colors.white,
    },
});
const stylesSuccess = StyleSheet.create({
    container: {
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        backgroundColor: colors.success,
        alignItems: "center",
    },
    textField: {
        flex: 1,
        fontFamily: "Inter_500Medium",
        fontSize: 17,
        marginLeft: 10,
        color: colors.white,
    },
});
