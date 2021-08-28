import React from "react";
import tw from "tailwind-react-native-classnames";
import { Dimensions } from "react-native";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DriverStatus from "./DriverStatus";
import RideStatus from "./RideStatus";

const Stack = createStackNavigator();
const BottomSheetDriver = () => {
    return (
        <View
            style={[tw`bg-white rounded-tl-lg rounded-tr-lg shadow-lg flex-1`]}
        >
            <Stack.Navigator initialRouteName="RideStatus">
                <Stack.Screen
                    name="DriverStatus"
                    component={DriverStatus}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RideStatus"
                    component={RideStatus}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </View>
    );
};

export default BottomSheetDriver;

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
