import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import fonts from "../../assets/fonts/fonts";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
const CardButton = ({ label, icon, onPress }) => {
    return (
        <TouchableOpacity
            style={[tw`rounded shadow bg-gray-100`, { width: "45%" }]}
            onPress={onPress}
        >
            <View
                style={[
                    tw`justify-center items-center border-b border-gray-200 p-2`,
                    styles.borderThin,
                ]}
            >
                {icon}
            </View>
            <View style={tw`flex-row justify-center items-center p-2`}>
                <Text style={[tw`text-gray-500 text-sm`, styles.fontInter]}>
                    {label}
                </Text>

                <MaterialIcons
                    name="chevron-right"
                    size={20}
                    color={colors.textDarker}
                    style={tw`self-end`}
                />
            </View>
        </TouchableOpacity>
    );
};

export default CardButton;

const styles = StyleSheet.create({
    fontPoppins: {
        fontFamily: fonts.poppinsRegular,
    },
    fontInter: {
        fontFamily: fonts.interRegular,
    },
    borderThin: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
