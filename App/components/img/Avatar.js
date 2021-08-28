import React from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import constants from "../../util/constants";

export const Avatar = ({ size, src, loading, test }) => {
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
        if (
            src === "profile_images/./../assets/img/profile.svg" ||
            src === "./../assets/img/profile.svg"
        ) {
            return (
                <MaterialIcons
                    name="sentiment-satisfied"
                    color={colors.primary}
                    size={size}
                />
            );
        } else if (test) {
            return (
                <Image
                    style={styles.image}
                    source={{
                        uri: src,
                    }}
                />
            );
        } else {
            return (
                <Image
                    style={styles.image}
                    source={{
                        uri: `${constants.serverUrl}storage/${src}`,
                    }}
                />
            );
        }
    }
};
