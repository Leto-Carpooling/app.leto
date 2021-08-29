import React, { useContext, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import tw from "tailwind-react-native-classnames";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GOOGLE_MAPS_API_KEY } from "@env";

import colors from "../../assets/colors/colors";
import { AppContext } from "../../util/AppContext";
import BottomSheetRider from "../subscreens/rider/BottomSheetRider";
import BottomSheetDriver from "../subscreens/driver/BottomSheetDriver";
import { IconButton } from "../../components/btn/IconButton";
import Map from "../../components/map/Map";
import { api } from "../../util/api";
import { Log } from "../../util/Logger";
import AppBottomSheet from "../../components/containers/AppBottomSheet";
import { removeDocSubmissions, removeUpgradeStatus } from "../../util/cleanup";

export default ({ navigation }) => {
    const { isDriver, setIsDriver, setOrigin, upgradeSubmitted, user } =
        useContext(AppContext);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
        Poppins_500Medium,
    });

    useEffect(() => {
        if (!isDriver) checkUpgradeApproval();
    }, []);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={[tw`flex-1`]}>
                <Map />
                <SafeAreaView style={tw`absolute top-5 right-5`}>
                    <View style={tw`rounded-full p-2 bg-white shadow-lg`}>
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

                <AppBottomSheet>
                    {isDriver ? <BottomSheetDriver /> : <BottomSheetRider />}
                </AppBottomSheet>
            </View>
        );
    }

    function checkUpgradeApproval() {
        if (upgradeSubmitted) {
            const config = {
                headers: {
                    auth: user.token,
                },
            };

            api.post(`driver/checkApproval.php`, {}, config)
                .then((resp) => {
                    Log("getUpgradeStatus", resp.data);
                    // set isDriver true
                    if (
                        resp.data.status === "OK" &&
                        resp.data.message === "approved"
                    ) {
                        setIsDriver(true);
                        removeUpgradeStatus();
                        removeDocSubmissions();
                        navigation.navigate("SuccessApproved");
                        setUserIsDriver();
                    }
                })
                .catch((err) => {
                    Log("getUpgradeStatus", err);
                });
        }
    }

    async function setUserIsDriver() {
        await AsyncStorage.setItem("@is_driver", "is_driver");
    }

    async function getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            Log("location", "denied");
            return;
        }
        await Location.watchPositionAsync({}, (location) => {
            var config = {
                method: "get",
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&type=route&key=${GOOGLE_MAPS_API_KEY}`,
                headers: {},
            };

            axios(config)
                .then(function (response) {
                    console.log(response.data.results);
                    setOrigin({
                        lat: location.coords.latitude,
                        lng: location.coords.longitude,
                        name: response.data.results[0].name,
                        placeId: response.data.results[0].place_id,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });

        // let location = await Location.getCurrentPositionAsync({
        //     enableHighAccuracy: true,
        // });
        //console.log(location);
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
