import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import colors from "../assets/colors/colors";

export const TextField = ({ icon, style, ...props }) => {
    return (
        <View style={[styles.container, style]}>
            {icon}
            <TextInput {...props} style={styles.textField} />
        </View>
    );
};

const styles = StyleSheet.create({
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
