import React, { useState, useEffect, useContext } from "react";
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

import { AppContext } from "../util/AppContext";

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
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import ResetPassword2 from "../screens/ResetPassword2";
import SuccessResetPassword from "../screens/SuccessResetPassword";
import SuccessResetPassword2 from "../screens/SuccessResetPassword2";
import SetName from "../screens/SetName";
import VerifyPhone from "../screens/VerifyPhone";

import { api } from "./api";
import { Log } from "../util/Logger";

function CustomDrawerContent({ navigation, ...props }) {
    //const [user, setUser] = useState({});
    const [profileBox, setProfileBox] = useState(null);
    // const [loading, setLoading] = useState(true);
    // //console.log(user);
    const { user, upgradeSubmitted } = useContext(AppContext);
    //console.log(user);
    useEffect(() => {
        setProfileBox(
            user && (
                <ProfileBox
                    toProfile={() => navigation.navigate("Profile")}
                    signout={() => logout(navigation)}
                    user={user}
                />
            )
        );
    }, [user]);

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
                    {profileBox}

                    <Spacer height={10} />
                    {renderUpgradeDrawerItems()}
                </View>
            </DrawerContentScrollView>
        );
    }

    function renderUpgradeDrawerItems() {
        if (upgradeSubmitted) {
            return (
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
                    onPress={() => navigation.navigate("UpgradeStatus")}
                />
            );
        } else {
            return (
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
                    onPress={() => navigation.navigate("UpgradeOne")}
                />
            );
        }
    }
}

const logout = async (navigation) => {
    try {
        await invalidateToken();
        await AsyncStorage.removeItem("@user");
        navigation.reset({
            index: 0,
            routes: [{ name: "OnBoarding" }],
        });
    } catch (e) {
        console.log(e);
    }
};

async function getUser(setUser) {
    const user = await AsyncStorage.getItem("@user");
    Log("getUser", user);
    setUser(JSON.parse(user));
}

function renderProfileBox() {
    return (
        user && (
            <ProfileBox
                toProfile={() => navigation.navigate("Profile")}
                signout={() => logout(navigation)}
                user={user}
            />
        )
    );
}

const invalidateToken = async () => {
    try {
        const user = JSON.parse(await AsyncStorage.getItem("@user"));
        const config = {
            headers: {
                auth: user.token,
            },
        };
        api.post(`logout.php`, {}, config)
            .then((resp) => {
                console.log(resp.data); //OK
                if (resp.data.status !== "OK") {
                    //setToastVisible(true);
                    //setToastText(resp.data.message);
                    //setBtnLoading(false);
                    // navigation.navigate("VerifyEmail", {
                    //     token: token,
                    // });
                } else {
                    //setBtnLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                //setBtnLoading(false);
                //setToastVisible(true);
                //setToastText("Something went wrong.");
            });
    } catch (error) {
        console.log(error);
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
            <Drawer.Screen
                name="OnBoarding"
                component={OnBoarding}
                options={{ swipeEnabled: false }}
            />
            <Drawer.Screen
                name="SignUp"
                component={SignUp}
                options={{ swipeEnabled: false }}
            />
            <Drawer.Screen
                name="SetPassword"
                component={SetPassword}
                options={{ swipeEnabled: false }}
            />
            <Drawer.Screen
                name="SuccessSignUp"
                component={SuccessSignUp}
                options={{ swipeEnabled: false }}
            />
            <Drawer.Screen
                name="VerifyEmail"
                component={VerifyEmail}
                options={{ swipeEnabled: false }}
            />
            <Drawer.Screen name="UpgradeOne" component={UpgradeOne} />
            <Drawer.Screen name="UpgradeTwo" component={UpgradeTwo} />
            <Drawer.Screen name="UpgradeThree" component={UpgradeThree} />
            <Drawer.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{ swipeEnabled: false }}
            />
            <Drawer.Screen name="ResetPassword" component={ResetPassword} />
            <Drawer.Screen name="ResetPassword2" component={ResetPassword2} />
            <Drawer.Screen name="SetName" component={SetName} />
            <Drawer.Screen name="VerifyPhone" component={VerifyPhone} />
            <Drawer.Screen
                name="SuccessResetPassword"
                component={SuccessResetPassword}
            />
            <Drawer.Screen
                name="SuccessResetPassword2"
                component={SuccessResetPassword2}
            />
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
