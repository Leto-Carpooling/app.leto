import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useBottomSheet } from "@gorhom/bottom-sheet";

import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";

import Spacer from "../../../components/auxx/Spacer";
import { TextField } from "../../../components/input/TextField";
import DriverItem from "../../../components/display/DriverItem";
import PriceLabel from "../../../components/display/PriceLabel";
import { Button } from "../../../components/btn/Button";

import { getRoute } from "../../../logic/getRoute";
import { saveRoute } from "../../../logic/saveRoute";

import { AppContext } from "../../../util/AppContext";
import { Log } from "../../../util/Logger";
import { assignDriver, cancelRide, getFare, timeFormatter } from "../../../logic/functions";

const HangTight = ({ route }) => {
    const navigation = useNavigation();
    const { snapToIndex } = useBottomSheet();
    const [status, setStatus] = useState(0);
    const {
        origin,
        dest,
        user,
        db,
        setDest,
        setRiderMarkers,
        setMapDirections,
        setmIndentifiers,
        setRideOrigin,
        setRideDest,
    } = useContext(AppContext);
    const [price, setPrice] = useState(0);
    const [currency, setCurrency] = useState("");
    const [cancelBtnLoading, setCancelBtnLoading] = useState(false);

    const [routeInfo, setRouteInfo] = useState(null);
    const [otherRiders, setOtherRiders] = useState([]);
    const [groupText, setGroupText] = useState("Looking for matches");
    const [timer, setTimer] = useState(timeFormatter(60));

    //get the riders route
    useEffect(() => {
        snapToIndex(1);
        if (!dest || !origin) return;

        (async () => {
            const route_ = await getRoute(origin.placeId, dest.placeId);
            // Log("riders route", route);
            saveRoute(
                route_,
                60,
                user,
                db,
                route.params.rideType,
                (routeInfo) => {
                    /**
                     * Request the fare,
                     * Add event listeners to the groups,
                     * Update the map
                     * listen to the timer
                     */
                    setStatus(1);
                    setRouteInfo(routeInfo);
                    Log("47: Route Info", routeInfo);
                    getFare(routeInfo.groupId, user, (fareData) => {
                        setCurrency(fareData.currency);
                    });

                    let groupUrl = `groups/gid-${routeInfo.groupId}`;

                    db.ref(`${groupUrl}/fares/uid-${routeInfo.userId}`).on(
                        "value",
                        (snapshot) => {
                            let fare = snapshot.val();
                            setPrice(fare);
                        }
                    );

                    db.ref(`${groupUrl}`)
                        .get()
                        .then((snapshot) => {
                            if (snapshot.exists()) {
                                const groupDetails = snapshot.val();
                                Log("group route", groupDetails);
                                const direction = {
                                    startPlaceId: groupDetails.startPlaceId,
                                    endPlaceId: groupDetails.endPlaceId,
                                };
                                setRideOrigin({
                                    lat: groupDetails.sLat,
                                    lng: groupDetails.sLong,
                                    name: "Pickup",
                                    placeId: groupDetails.startPlaceId,
                                });
                                setRideDest({
                                    lat: groupDetails.eLat,
                                    lng: groupDetails.eLong,
                                    name: "Destination",
                                    placeId: groupDetails.endPlaceId,
                                });
                                //will trigger drawing of polyline
                                setMapDirections([direction]);
                            }
                        })
                        .catch((err) => {
                            Log("Listening on group", err);
                        });

                    //listen to users and their location changes
                    db.ref(`${groupUrl}/usersIndex`).on("value", (snapshot) => {
                        //listen to all users
                        //you can list them here
                        let users = snapshot.val();
                        let otherRiders = [];

                        const markers = [];
                        const identifiers = [];
                        let i = 0;
                        const numUsers = users ? Object.keys(users).length : 0;
                        for (const uid in users) {
                            i++;
                            const id = uid.split("-")[1];
                            otherRiders.push(id);

                            db.ref(`users/uid-${id}`).on(
                                "value",
                                (snapshot) => {
                                    const userDetails = snapshot.val();
                                    const currUserId = user.token.split("-")[0];
                                    //get the user data from here, including the current location.
                                    identifiers.push(`${uid}`);
                                    const marker = {
                                        coords: userDetails.cLocation,
                                        title:
                                            id === currUserId
                                                ? "You"
                                                : `${userDetails.firstname} ${userDetails.lastname}`,
                                        desc: `Rider`,
                                        identifier: `${uid}`,
                                        type:
                                            id === currUserId ? "me" : "rider",
                                    };
                                    markers.push(marker);
                                    if (i === numUsers) {
                                        setRiderMarkers(markers);
                                        setmIndentifiers(identifiers);
                                    }
                                }
                            );
                        }

                        setOtherRiders(otherRiders);
                        if (otherRiders.length > 1) {
                            let text =
                                "You and " +
                                (otherRiders.length - 1) +
                                " other rider" +
                                (otherRiders.length - 1 > 1 ? "s" : "") +
                                " are sharing this ride";

                            setGroupText(text);
                        } else {
                            setGroupText(
                                "You are the only rider in this ride group"
                            );
                        }
                    });

                    //timer
                    db.ref(`${groupUrl}/timer`).on("value", (snapshot) => {
                        let currentTime = snapshot.val();
                        setTimer(timeFormatter(currentTime));

                        //show pickup point then assign drivers
                        //show pickup point then assign drivers
                        if (currentTime == 0) {
                            assignDriver(routeInfo, user).then((response) =>{
                             if(response.data.status == "OK"){
                                Log("Assign driver response", JSON.parse(response.data.message));
                                setStatus(2);
                             }
                            
                            }).catch(err =>{
                                Log("Error Assigning driver", err)
                            });
                            setStatus(2);
                            clearInterval(interval);
                        }
                    });

                    //maintain online status of others
                }
            );
        })();
    }, [dest]);

    // useEffect(() => {
    //     if (status === 2) {
    //         setTimeout(() => {
    //             navigation.navigate("Pickup");
    //         }, 1000 * 10);
    //     }
    // }, [status]);

    useEffect(() => {
        if (routeInfo && routeInfo.deleted) {
            let groupUrl = `groups/gid-${routeInfo.groupId}`;
            db.ref(`${groupUrl}/fares/uid-${routeInfo.userId}`).off();
            db.ref(`${groupUrl}/locations`).off();
            db.ref(`${groupUrl}/usersIndex`).off();
            otherRiders.forEach((riderId) => {
                db.ref(`users/${riderId}/cLocation`).off();
            });
            setTimer(0);
        }
    }, [routeInfo]);

    return (
        <View style={tw`flex-1 p-2 bg-white`}>
            <Text style={[tw`text-2xl text-gray-600 m-2`, styles.fp]}>
                Hang tight
            </Text>
            <View style={tw`p-2 flex-row justify-between items-center`}>
                <View style={tw`w-8/12`}>{renderStatus()}</View>
                {renderPrice()}
            </View>
            <View style={tw`p-2 flex-1`}>
                <TextField
                    iconName="my-location"
                    placeholder="Where from?"
                    value={origin?.name}
                    editable={false}
                />
                <Spacer height={1} />
                <TextField
                    iconName="place"
                    placeholder="Where to?"
                    value={dest?.name}
                    editable={false}
                />
                <Spacer height={10} />
                {renderDriverItem()}
                <Spacer height={5} />

                <View style={[tw`flex-1 justify-end`]}>
                    <Button
                        text="Cancel ride"
                        iconName="close"
                        loading={cancelBtnLoading}
                        onPress={() => {
                            setCancelBtnLoading(true);
                            cancelRide(routeInfo, user)
                                .then((response) => {
                                    setCancelBtnLoading(false);
                                    let jRes = response.data;
                                    Log("CancelRide Response: ", jRes);
                                    if (jRes.status == "OK") {
                                        let deletedRouteInfo = routeInfo;
                                        deletedRouteInfo.deleted = true;
                                        setRouteInfo(deletedRouteInfo);
                                        navigation.reset({
                                            index: 0,
                                            routes: [
                                                { name: "RideTypeChooser" },
                                            ],
                                        });
                                        setDest(null);
                                        return;
                                    }

                                    Alert.alert("Error", jRes.message);
                                })
                                .catch((error) => {
                                    setCancelBtnLoading(false);
                                    Log("Cancel ride error", error);
                                });
                        }}
                    />
                </View>
            </View>
        </View>
    );

    function renderDriverItem() {
        return status === 2 && <DriverItem />;
    }

    function renderPrice() {
        return status >= 1 && <PriceLabel price={price} header={currency} />;
    }

    function renderStatus() {
        switch (status) {
            case 0:
                return (
                    <View style={tw`flex-row items-center`}>
                        <ActivityIndicator
                            size="small"
                            color={colors.primary}
                        />
                        <Text style={[tw`text-gray-500 ml-2 `, styles.fi]}>
                            {groupText}
                        </Text>
                    </View>
                );
            case 1:
                return (
                    <>
                        <View style={tw`flex-row items-center`}>
                            <MaterialIcons
                                name="check"
                                color={colors.success}
                                size={20}
                            />
                            <Text style={[tw`text-gray-500 ml-2 `, styles.fi]}>
                                {groupText}
                            </Text>
                        </View>
                        <View style={tw`flex-row items-center mt-2`}>
                            <ActivityIndicator
                                size="small"
                                color={colors.primary}
                            />
                            <Text style={[tw`text-gray-500 ml-2`, styles.fi]}>
                                Waiting for timeout {timer}
                            </Text>
                        </View>
                    </>
                );
            case 2:
                return (
                    <>
                        <View style={tw`flex-row items-center`}>
                            <ActivityIndicator
                                size="small"
                                color={colors.primary}
                            />
                            <Text style={[tw`text-gray-500 ml-2 `, styles.fi]}>
                               Finding your driver
                            </Text>
                        </View>
                        <View style={tw`flex-row items-center mt-2`}>
                            <ActivityIndicator
                                size="small"
                                color={colors.primary}
                            />
                            <Text style={[tw`text-gray-500 ml-2`, styles.fi]}>
                                Finding best pickup point
                            </Text>
                        </View>
                    </>
                );
        }
    }
};

export default HangTight;

const styles = StyleSheet.create({
    fp: {
        fontFamily: fonts.poppinsRegular,
    },
    fi: {
        fontFamily: fonts.interRegular,
    },
});
