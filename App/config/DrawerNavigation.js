import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "../util/AppContext";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ProfileBox } from "../components/display/ProfileBox";
import colors from "../assets/colors/colors";
import Spacer from "../components/auxx/Spacer";
import { api } from "../util/api";
import { Log } from "../util/Logger";

import OnBoarding from "../screens/onboarding/OnBoarding";
import SignUp from "../screens/auth/SignUp";
import SetPassword from "../screens/auth/SetPassword";
import SuccessSignUp from "../screens/info/SuccessSignUp";
import Login from "../screens/auth/Login";
import Home from "../screens/home/Home";
import VerifyEmail from "../screens/auth/VerifyEmail";
import Profile from "../screens/profile/Profile";
import UpgradeOne from "../screens/upgrade/UpgradeOne";
import UpgradeTwo from "../screens/upgrade/UpgradeTwo";
import UpgradeThree from "../screens/upgrade/UpgradeThree";
import UpgradeSubmitted from "../screens/upgrade/UpgradeSubmitted";
import UpgradeStatus from "../screens/upgrade/UpgradeStatus";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ResetPassword from "../screens/auth/ResetPassword";
import ResetPassword2 from "../screens/auth/ResetPassword2";
import SuccessResetPassword from "../screens/info/SuccessResetPassword";
import SuccessResetPassword2 from "../screens/info/SuccessResetPassword2";
import SetName from "../screens/auth/SetName";
import VerifyPhone from "../screens/profile/VerifyPhone";
import SuccessApproved from "../screens/info/SuccessApproved";

import {
    removeUpgradeStatus,
    removeDriverStatus,
    removeDocSubmissions,
} from "../util/cleanup";

function CustomDrawerContent({ navigation, ...props }) {
    const [profileBox, setProfileBox] = useState(null);
    const { user, upgradeSubmitted, isDriver } = useContext(AppContext);
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
                    {!isDriver && renderUpgradeDrawerItems()}
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
        await removeDocSubmissions();
        await removeDriverStatus();
        await removeUpgradeStatus();
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
        api.post(`user/logout.php`, {}, config)
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
            <Drawer.Screen name="SuccessApproved" component={SuccessApproved} />
            <Drawer.Screen name="BottomSheetTest" component={BottomSheetTest} />
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
        height: 160,
        justifyContent: "center",
        alignItems: "center",
    },
    logoText: {
        color: colors.textDarker,
        fontFamily: "Poppins_400Regular",
        fontSize: 40,
        color: colors.white,
    },
    tagline: {
        color: colors.textLighter,
        fontFamily: "Inter_500Medium",
        fontSize: 14,
        color: colors.white,
    },
    center: {
        justifyContent: "center",
        padding: 5,
    },
});
