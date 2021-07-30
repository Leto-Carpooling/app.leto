import React from "react";
import { View, StyleSheet } from "react-native";

const Spacer = ({ height, width }) => {
    styles = StyleSheet.create({
        space: {
            height: height && height,
            width: width && width,
        },
    });
    return <View style={styles.space}></View>;
};

export default Spacer;
