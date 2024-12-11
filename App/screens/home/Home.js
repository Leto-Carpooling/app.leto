import React, { useContext, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import { Inter_500Medium, Inter_400Regular } from "@expo-google-fonts/inter";
import { MaterialIcons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import tw from "tailwind-react-native-classnames";
import * as Location from "expo-location";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app";

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
import { writeToDatabase } from "../../logic/rtdbFunctions";

export default ({ navigation }) => {
    const {
        isDriver,
        setIsDriver,
        setOrigin,
        origin,
        upgradeSubmitted,
        user,
        db,
        ready,
        setCurLoc,
        curLoc,
    } = useContext(AppContext);

    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Inter_500Medium,
        Inter_400Regular,
        Poppins_500Medium,
    });

    //when the context is ready call these functions
    useEffect(() => {
        if (ready) {
            if (!isDriver) checkUpgradeApproval();
            getCurrentLocation();
            if (isDriver) updateCurLoc();
        }
    }, [ready]);

    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <View style={[tw`flex-1`]}>
                <Map />

                <AppBottomSheet>
                    {isDriver ? <BottomSheetDriver /> : <BottomSheetRider />}
                </AppBottomSheet>
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

    /**
     * Updates the current location to the OT_Server
     * sends the timestamp and curLoc object keys
     */
    function updateCurLoc() {
        const timestamp = firebase.database.ServerValue.TIMESTAMP;

        //send update to server every minute
        setInterval(() => {}, 1000 * 60);
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
                    //Log("current location", response.data);
                    if (!origin) {
                        setOrigin({
                            lat: location.coords.latitude,
                            lng: location.coords.longitude,
                            name: response.data.results[0].name,
                            placeId: response.data.results[0].place_id,
                            secondaryText: response.data.results[0].vicinity,
                        });
                    }

                    const coords = {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    };

                    //setting the current location in AppContext
                    setCurLoc(coords);

                    if (isDriver) {
                        const driverId = user?.token.split("-")[0];
                        writeToDatabase(
                            `drivers/did-${driverId}/cLocation`,
                            coords,
                            db
                        );
                    } else {
                        const userId = user?.token.split("-")[0];

                        writeToDatabase(
                            `users/uid-${userId}`,
                            {
                                cLocation: coords,
                                profileImage: user?.profileImage,
                                firstname: user?.firstname,
                                lastname: user?.lastname,
                                phone: user?.phone,
                            },
                            db
                        );
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    }
};
