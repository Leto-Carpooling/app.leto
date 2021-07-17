import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OnBoarding from "../screens/OnBoarding";
import SignUp from "../screens/SignUp";

const MainStack = createStackNavigator();

const MainStackScreen = () => (
    <MainStack.Navigator headerMode="none" initialRouteName="SignUp">
        <MainStack.Screen name="Onboarding" component={OnBoarding} />
        <MainStack.Screen name="SignUp" component={SignUp} />
    </MainStack.Navigator>
);

export default () => (
    <NavigationContainer>
        <MainStackScreen />
    </NavigationContainer>
);
