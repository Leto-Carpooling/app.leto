import React, { useRef, useState } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import tw from "tailwind-react-native-classnames";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import RideTypeChooser from "./RideTypeChooser";
import WhereTo from "./WhereTo";
import { createStackNavigator } from "@react-navigation/stack";
import HangTight from "./HangTight";
import Pickup from "./Pickup";
import InTransit from "./InTransit";
import Arrived from "./Arrived";

const Stack = createStackNavigator();
const BottomSheetRider = () => {
    return (
        <View
            style={[tw`bg-white rounded-tl-lg rounded-tr-lg shadow-lg flex-1`]}
        >
            <Stack.Navigator initialRouteName="RideTypeChooser">
                <Stack.Screen
                    name="RideTypeChooser"
                    component={RideTypeChooser}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="WhereTo"
                    component={WhereTo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HangTight"
                    component={HangTight}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Pickup"
                    component={Pickup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="InTransit"
                    component={InTransit}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Arrived"
                    component={Arrived}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </View>
    );
};

export default BottomSheetRider;

const styles = StyleSheet.create({
    height_90: {
        height: Dimensions.get("window").height * 0.9,
    },
});

const renderHeader = () => (
    <View style={tw`flex justify-center items-center`}>
        <View style={tw`w-8 h-2 mt-1 rounded-full bg-gray-200`}></View>
    </View>
);
