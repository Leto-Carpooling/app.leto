import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../assets/colors/colors";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";

export const Toast = ({ type, text, hidden, style }) => {
    let hiddenStyle;
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
    });

    if (hidden) {
        hiddenStyle = { display: "none" };
    }

    function setIcon() {
        switch (type) {
            case "danger":
                return (
                    <MaterialIcons
                        name="error"
                        size={30}
                        color={colors.white}
                    />
                );
        }
    }

    function setTheme() {
        switch (type) {
            case "danger":
                return {
                    backgroundColor: colors.danger,
                };
        }
    }
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={[styles.container, setTheme(), hiddenStyle, style]}>
                {setIcon()}
                <Text style={styles.toastTxt}>{text}</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: "87%",
        borderRadius: 3,
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 12,
        elevation: 5,
        alignItems: "center",
    },
    toastTxt: {
        fontSize: 16,
        fontFamily: "Inter_500Medium",
        color: colors.white,
        flex: 1,
        flexWrap: "wrap",
        marginLeft: 10,
    },
});
