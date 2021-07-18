import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from "@react-navigation/drawer";

import OnBoarding from "../screens/OnBoarding";
import SignUp from "../screens/SignUp";
import SetPassword from "../screens/SetPassword";
import SuccessSignUp from "../screens/SuccessSignUp";
import Login from "../screens/Login";
import Home from "../screens/Home";
import { Text, View, StyleSheet } from "react-native";
import colors from "../assets/colors/colors";

import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";

function CustomDrawerContent(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Text style={styles.logoText}>Leto.</Text>
                    <Text style={styles.tagline}>Cheaper greener rides.</Text>
                </View>
                <DrawerItemList {...props} />
                <DrawerItem
                    label="Help"
                    onPress={() => alert("Link to help")}
                />
            </DrawerContentScrollView>
        );
    }
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="OnBoarding" component={OnBoarding} />
            <Drawer.Screen name="SignUp" component={SignUp} />
            <Drawer.Screen name="SetPassword" component={SetPassword} />
            <Drawer.Screen name="SuccessSignUp" component={SuccessSignUp} />
        </Drawer.Navigator>
    );
}

export default () => {
    return (
        <NavigationContainer>
            <MyDrawer />
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        backgroundColor: colors.primary,
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
    },
    logoText: {
        color: colors.textDarker,
        fontFamily: "Poppins_400Regular",
        fontSize: 60,
        color: colors.white,
    },
    tagline: {
        color: colors.textLighter,
        fontFamily: "Inter_500Medium",
        fontSize: 20,
        color: colors.white,
    },
});
