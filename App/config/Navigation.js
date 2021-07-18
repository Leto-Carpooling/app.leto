import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import OnBoarding from "../screens/OnBoarding";
import SignUp from "../screens/SignUp";
import SetPassword from "../screens/SetPassword";
import SuccessSignUp from "../screens/SuccessSignUp";
import Login from "../screens/Login";
import Home from "../screens/Home";

const MainStack = createStackNavigator();

const MainStackScreen = () => (
    <MainStack.Navigator headerMode="none" initialRouteName="Home">
        <MainStack.Screen name="Onboarding" component={OnBoarding} />
        <MainStack.Screen name="SignUp" component={SignUp} />
        <MainStack.Screen name="SetPassword" component={SetPassword} />
        <MainStack.Screen name="SuccessSignUp" component={SuccessSignUp} />
        <MainStack.Screen name="Login" component={Login} />
        <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
);

export default () => (
    <NavigationContainer>
        <MainStackScreen />
    </NavigationContainer>
);
