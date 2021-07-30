import React from "react";
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";

const FlexButton = ({ text, iconName, onPress }) => {
    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.button}>
                <View style={styles.textHolder}>
                    <Text style={styles.btnTxt}>{text}</Text>
                </View>
                <MaterialIcons
                    name={iconName}
                    size={24}
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
        elevation: 5,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexGrow: 0,
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 3,
    },
    textHolder: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    btnTxt: {
        color: colors.white,
        fontFamily: "Inter_500Medium",
        fontSize: 16,
    },
    btnIcon: {
        marginLeft: 10,
    },
});

export default FlexButton;
