import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextField } from "../input/TextField";
import colors from "../../assets/colors/colors";

export const LabelledTextInput = ({ label, placeholder, icon, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextField
                icon={icon}
                placeholder={placeholder}
                onChangeText={() => console.log("test")}
                {...props}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    label: {
        color: colors.textLighter,
        fontFamily: "Inter_500Medium",
        fontSize: 15,
        marginBottom: 8,
    },
});
