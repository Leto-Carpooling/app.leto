import React, { useRef, useState } from "react";
import BottomSheet from "reanimated-bottom-sheet";
import tw from "tailwind-react-native-classnames";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import RideTypeChooser from "./RideTypeChooser";
import WhereTo from "./WhereTo";
import { createStackNavigator } from "@react-navigation/stack";
import HangTight from "./HangTight";

const Stack = createStackNavigator();
const AppBottomSheet = () => {
    return (
        <View
            style={[tw`bg-white rounded-tl-lg rounded-tr-lg shadow-lg flex-1`]}
        >
            {renderHeader()}

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
            </Stack.Navigator>
        </View>
    );
};

export default AppBottomSheet;

const styles = StyleSheet.create({
    height_90: {
        height: Dimensions.get("window").height * 0.9,
    },
});

const renderContent = () => (
    <View
        style={[
            tw`bg-white rounded-tl-lg rounded-tr-lg shadow-lg`,
            styles.height_90,
        ]}
    >
        {renderHeader()}

        <Stack.Navigator initialRouteName="WhereTo">
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
        </Stack.Navigator>
    </View>
);

const renderHeader = () => (
    <View style={tw`flex justify-center items-center`}>
        <View style={tw`w-8 h-2 mt-1 rounded-full bg-gray-200`}></View>
    </View>
);
