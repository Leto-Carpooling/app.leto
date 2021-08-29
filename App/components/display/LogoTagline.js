import React from "react";
import { StyleSheet, Text, View } from "react-native";
import fonts from "../../assets/fonts/fonts";
import tw from "tailwind-react-native-classnames";

const LogoTagline = () => {
    return (
        <View>
            <Text style={[tw`text-3xl text-gray-600`, styles.title]}>
                Leto.
            </Text>
            <Text style={[tw`text-sm text-gray-500`]}>
                Cheaper greener rides
            </Text>
        </View>
    );
};

export default LogoTagline;

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.poppinsRegular,
    },
    subtitle: {
        fontFamily: fonts.interMedium,
    },
});
