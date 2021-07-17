import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../assets/colors/colors";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";

export const Toast = ({ type, text, hidden }) => {
    let hiddenStyle;
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
    });

    if (hidden) {
        hiddenStyle = { display: "none" };
    }
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={[styles.container, hiddenStyle]}>
                <MaterialIcons name="error" size={30} color={colors.white} />
                <Text style={styles.toastTxt}>Email already taken</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.danger,
        width: "87%",
        height: 50,
        borderRadius: 3,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 5,
        elevation: 10,
        alignItems: "center",
    },
    toastTxt: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        color: colors.white,
        marginLeft: 10,
    },
});
