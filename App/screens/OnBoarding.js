import React from "react";
import { View, Text, StatusBar, SafeAreaView } from "react-native";
import colors from "../assets/colors/colors";

export default () => {
    return (
        <SafeAreaView>
            <StatusBar backgroundColor={colors.primary} />
            <Text>This is a text</Text>
        </SafeAreaView>
    );
};
