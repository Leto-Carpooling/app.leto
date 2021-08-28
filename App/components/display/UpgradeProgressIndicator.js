import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const UpgradeProgressIndicator = ({ level }) => {
    return (
        <View style={styles.parent}>
            <View style={styles.container}>
                <View
                    style={[
                        styles.circle,
                        level >= 1 ? styles.themePrimary : styles.themeGray,
                    ]}
                ></View>
                <View
                    style={[
                        styles.connector,
                        level >= 2 ? styles.themePrimary : styles.themeGray,
                    ]}
                ></View>
                <View
                    style={[
                        styles.circle,
                        level >= 2 ? styles.themePrimary : styles.themeGray,
                    ]}
                ></View>
                <View
                    style={[
                        styles.connector,
                        level >= 3 ? styles.themePrimary : styles.themeGray,
                    ]}
                ></View>
                <View
                    style={[
                        styles.circle,
                        level >= 3 ? styles.themePrimary : styles.themeGray,
                    ]}
                ></View>
            </View>
            <Text style={styles.text}>{level} of 3</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    parent: {
        flexDirection: "column",
    },
    container: {
        flexDirection: "row",
        padding: 5,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 25,
    },
    connector: {
        width: "30%",
        height: 6,
    },
    themePrimary: {
        backgroundColor: colors.primary,
    },
    themeGray: {
        backgroundColor: colors.divider,
    },
    text: {
        fontFamily: fonts.interMedium,
        fontSize: 14,
        textAlign: "right",
        color: colors.textLighter,
        paddingRight: 30,
    },
});

export default UpgradeProgressIndicator;
