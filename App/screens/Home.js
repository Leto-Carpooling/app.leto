import React, { useState, useContext, useEffect } from "react";
import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../assets/colors/colors";
import AppLoading from "expo-app-loading";
import { IconButton } from "../components/IconButton";
import tw from "tailwind-react-native-classnames";
import Animated from "react-native-reanimated";
import BottomSheetRider from "./subscreens/BottomSheetRider";
import { Button } from "../components/Button";
import { Dimensions } from "react-native";
import { AppContext } from "../util/AppContext";
import BottomSheetDriver from "./subscreens/BottomSheetDriver";
import Map from "../components/map/Map";
import * as Location from "expo-location";

export default ({ navigation }) => {
    const { isDriver, origin, setOrigin, setDest, dest } =
        useContext(AppContext);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
        Poppins_500Medium,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                //setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            setOrigin({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
                name: "Current Location",
            });
        })();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ScrollView>
                <View>
                    <View
                        style={{
                            height: Dimensions.get("window").height * 0.7,
                        }}
                    >
                        <Map />
                        <SafeAreaView style={tw`absolute top-5 right-5`}>
                            <View style={tw`rounded-full p-2 bg-white`}>
                                <IconButton
                                    icon={
                                        <MaterialIcons
                                            name="menu"
                                            size={25}
                                            color={colors.iconDark}
                                        />
                                    }
                                    onPress={() => navigation.toggleDrawer()}
                                />
                            </View>
                        </SafeAreaView>
                    </View>
                    <View style={styles.height_90}>
                        {isDriver ? (
                            <BottomSheetDriver />
                        ) : (
                            <BottomSheetRider />
                        )}
                    </View>
                </View>
            </ScrollView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    backIcon: {},
    logoText: {
        color: colors.textDarker,
        fontFamily: "Poppins_400Regular",
        fontSize: 60,
        marginLeft: 30,
    },
    tagline: {
        color: colors.textLighter,
        fontFamily: "Inter_500Medium",
        fontSize: 20,
        marginBottom: 15,
        marginLeft: 40,
    },
    title: {
        fontFamily: "Inter_400Regular",
        fontSize: 22,
        color: colors.textLighter,
    },
    label: {
        color: colors.textLighter,
        fontFamily: "Inter_500Medium",
        fontSize: 17,
        marginBottom: 8,
        marginLeft: 20,
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    btnContainer: {
        padding: 20,
        marginTop: 10,
    },
    topBar: {
        alignItems: "center",
        justifyContent: "flex-end",
        marginTop: 40,
        marginHorizontal: 30,
        marginBottom: 30,
        flexDirection: "row",
    },
    height_90: {
        height: Dimensions.get("window").height * 0.9,
    },
});
