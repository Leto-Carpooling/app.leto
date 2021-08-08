import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
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
import VerifyEmail from "../screens/VerifyEmail";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileBox } from "../components/ProfileBox";
import Spacer from "../components/Spacer";
import Profile from "../screens/Profile";
import UpgradeOne from "../screens/UpgradeOne";
import UpgradeTwo from "../screens/UpgradeTwo";
import UpgradeThree from "../screens/UpgradeThree";
import UpgradeSubmitted from "../screens/UpgradeSubmitted";
import UpgradeStatus from "../screens/UpgradeStatus";

function CustomDrawerContent({ navigation, ...props }) {
    const insets = useSafeAreaInsets();
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <DrawerContentScrollView
                contentContainerStyle={{
                    paddingTop: insets.top,
                }}
                {...props}
            >
                <View style={styles.header}>
                    <Text style={styles.logoText}>Leto.</Text>
                    <Text style={styles.tagline}>Cheaper greener rides.</Text>
                </View>

                <View style={styles.center}>
                    <ProfileBox
                        toProfile={() => navigation.navigate("Profile")}
                    />
                    <Spacer height={10} />
                    <DrawerItem
                        label="Sign up to drive"
                        labelStyle={{
                            fontFamily: "Inter_500Medium",
                            fontSize: 16,
                        }}
                        icon={() => (
                            <MaterialIcons
                                name="time-to-leave"
                                color={colors.iconDark}
                                size={20}
                            />
                        )}
                        activeBackgroundColor={colors.primary}
                        inactiveBackgroundColor={colors.white}
                        onPress={() => logout()}
                    />
                    <DrawerItem
                        label="Check approval"
                        labelStyle={{
                            fontFamily: "Inter_500Medium",
                            fontSize: 16,
                        }}
                        icon={() => (
                            <MaterialIcons
                                name="time-to-leave"
                                color={colors.iconDark}
                                size={20}
                            />
                        )}
                        activeBackgroundColor={colors.primary}
                        inactiveBackgroundColor={colors.white}
                        onPress={() => logout()}
                    />
                </View>
            </DrawerContentScrollView>
        );
    }
}

const logout = async () => {
    try {
        await AsyncStorage.removeItem("@token");
    } catch (e) {
        console.log(e);
    }
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
    return (
        <Drawer.Navigator
            initialRouteName="OnBoarding"
            drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="OnBoarding" component={OnBoarding} />
            <Drawer.Screen name="SignUp" component={SignUp} />
            <Drawer.Screen name="SetPassword" component={SetPassword} />
            <Drawer.Screen name="SuccessSignUp" component={SuccessSignUp} />
            <Drawer.Screen name="VerifyEmail" component={VerifyEmail} />
            <Drawer.Screen name="UpgradeOne" component={UpgradeOne} />
            <Drawer.Screen name="UpgradeTwo" component={UpgradeTwo} />
            <Drawer.Screen name="UpgradeThree" component={UpgradeThree} />
            <Drawer.Screen
                name="UpgradeSubmitted"
                component={UpgradeSubmitted}
            />
            <Drawer.Screen name="UpgradeStatus" component={UpgradeStatus} />
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
        height: 200,
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
    center: {
        justifyContent: "center",
        padding: 5,
    },
});
