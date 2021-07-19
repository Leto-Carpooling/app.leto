import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

export const AutoTextField = ({ value, ...props }) => {
    const [iconName, setIconName] = useState("mail");
    useEffect(() => {
        if (isNaN(Number(value)) || value === "") {
            setIconName("mail");
        } else {
            setIconName("phone");
        }
    }, [value]);
    return (
        <View style={styles.container}>
            <MaterialIcons name={iconName} size={30} color={colors.primary} />

            <TextInput {...props} style={styles.textField} value={value} />
        </View>
    );
};

function setIconName(value) {
    let iconName;
    if (isNaN(Number(value))) {
        iconName = "mail";
    } else {
        iconName = "phone";
    }
    return iconName;
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.textField,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    textField: {
        flex: 1,
        fontFamily: "Inter_500Medium",
        fontSize: 17,
        marginLeft: 10,
    },
});
