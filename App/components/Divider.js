import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";

const Divider = () => {
    return <View style={styles.divider}></View>;
};

const styles = StyleSheet.create({
    divider: {
        height: StyleSheet.hairlineWidth,
        marginHorizontal: 20,
        backgroundColor: colors.divider,
    },
});

export default Divider;
