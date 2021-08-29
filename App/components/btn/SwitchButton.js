import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import colors from "../../assets/colors/colors";

const SwitchButton = ({ on, setOn }) => {
    return (
        <TouchableOpacity
            style={[
                tw`rounded-3xl flex-row p-1 w-24 ${
                    on ? "justify-end" : "bg-gray-300"
                }`,
                on && { backgroundColor: colors.primary },
            ]}
            onPress={() => {
                setOn((on) => !on);
            }}
        >
            <View
                style={[
                    tw`rounded-full h-8 w-8 ${on ? "bg-white" : "bg-gray-400"}`,
                ]}
            ></View>
        </TouchableOpacity>
    );
};

export default SwitchButton;

const styles = StyleSheet.create({});
