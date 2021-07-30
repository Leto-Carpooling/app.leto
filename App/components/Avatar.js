import React from "react";
import { View, StyleSheet, Image } from "react-native";

export const Avatar = ({ size }) => {
    const styles = StyleSheet.create({
        image: {
            resizeMode: "cover",
            width: size,
            height: size,
            borderRadius: size / 2,
        },
    });

    return (
        <Image
            style={styles.image}
            source={{ uri: "https://picsum.photos/200/300" }}
        />
    );
};
