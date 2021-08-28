import React, { useState, useEffect } from "react";
import {
    TouchableHighlight,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";

export const Button = ({ onPress, text, loading, iconName, disabled }) => {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: disabled ? colors.disbaled : colors.primary,
            elevation: 1,
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingVertical: 13,
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 3,
        },
        textHolder: {
            justifyContent: "center",
            flexGrow: 1,
            alignItems: "center",
        },
        btnTxt: {
            color: colors.white,
            fontFamily: "Inter_500Medium",
            fontSize: 16,
        },
    });

    const [icon, setIcon] = useState(
        <MaterialIcons
            name={iconName ? iconName : "arrow-forward-ios"}
            size={17}
            style={styles.btnIcon}
            color={colors.white}
        />
    );
    useEffect(() => {
        showLoaderOrIcon();
    }, [loading]);

    function showLoaderOrIcon() {
        if (loading) {
            setIcon(<ActivityIndicator size="small" color={colors.white} />);
        } else {
            setIcon(
                <MaterialIcons
                    name={iconName ? iconName : "arrow-forward-ios"}
                    size={17}
                    style={styles.btnIcon}
                    color={colors.white}
                />
            );
        }
    }

    return (
        <TouchableHighlight onPress={onPress}>
            <View style={styles.button}>
                <View style={styles.textHolder}>
                    <Text style={styles.btnTxt}>{text}</Text>
                </View>
                {icon}
            </View>
        </TouchableHighlight>
    );
};
