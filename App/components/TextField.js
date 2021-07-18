import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import colors from "../assets/colors/colors";

export const TextField = ({ icon, ...props }) => {
    return (
        <View style={styles.container}>
            {icon}
            <TextInput {...props} style={styles.textField} />
        </View>
    );
};

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
