import React from "react";
import tw from "tailwind-react-native-classnames";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DriverStatus from "./DriverStatus";
import RideStatus from "./RideStatus";

const Stack = createStackNavigator();
const BottomSheetDriver = () => {
    return (
        <View
            style={[tw`bg-white rounded-tl-lg rounded-tr-lg shadow-lg flex-1`]}
        >
            <Stack.Navigator initialRouteName="DriverStatus">
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
