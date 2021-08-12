import React from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import { Log } from "../util/Logger";
import constants from "../util/constants";

export const Avatar = ({ size, src, loading }) => {
    const styles = StyleSheet.create({
        image: {
            resizeMode: "cover",
            width: size,
            height: size,
            borderRadius: size / 2,
        },
    });

    if (loading) {
        return <ActivityIndicator size="large" color={colors.primary} />;
    } else {
        return src === "./../assets/img/profile.svg" ? (
            <MaterialIcons
                name="sentiment-satisfied"
                color={colors.primary}
                size={size}
            />
        ) : (
            <Image
                style={styles.image}
                source={{
                    uri: `${constants.serverUrl}storage/${src}`,
                }}
            />
        );
    }
};
