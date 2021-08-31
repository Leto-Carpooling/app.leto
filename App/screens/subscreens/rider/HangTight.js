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
import { cancelRide, getFare, timeFormatter } from "../../../logic/functions";

const HangTight = ({ route }) => {
    const navigation = useNavigation();
    const { snapToIndex } = useBottomSheet();
    const [status, setStatus] = useState(0);
    const { origin, dest, user, db, setDest } = useContext(AppContext);
    const [price, setPrice] = useState(0);

    const [routeInfo, setRouteInfo] = useState(null);
    const [otherRiders, setOtherRiders ] = useState([]);
    const [groupText, setGroupText] = useState("Looking for matches");
    const [timer, setTimer] = useState(timeFormatter(60));

    //get the riders route
    useEffect(() => {
        snapToIndex(1);
        (async () => {
            const route_ = await getRoute(origin.placeId, dest.placeId);
            Log("riders route", route);
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
                    setTimer(routeInfo.groupTimer);

                    Log("47: Route Info", routeInfo);
                    getFare(routeInfo.groupId, user, (fareData) => {
                        //handle fare info here.
                        Log("48: Fare Data", fareData);
                    });

                    //listen for fare change
                    let groupUrl = `groups/gid-${routeInfo.groupId}`;

                    db.ref(`${groupUrl}/fares/uid-${routeInfo.userId}`).on(
                        "value",
                        (snapshot) => {
                            let fare = snapshot.val();
                            setPrice(fare);
                            //price = snapshot[`uid-${routeInfo.userId}`];
                        }
                    );

                    //listen for locations change
                    db.ref(`${groupUrl}/locations`).on("value", (snapshot) => {
                        let locations = snapshot.val();
                        //update the map
                    });

                    //listen to users and their location changes
                    db.ref(`${groupUrl}/usersIndex`).on("value", (snapshot) => {
                        //listen to all users
                        //you can list them here
                        Log("From hangtight snapshot:", snapshot)
                        let users = snapshot.val();
                        let otherRiders = [];

                        for (const uid in users) {
                            let id = uid.split("-")[1];
                            otherRiders.push(id);
                            db.ref(`users/${id}/cLocation`).on(
                                "value",
                                (snapshot) => {
                                    let userDetails = snapshot.val();
                                    //get the user data from here, including the current location.
                                }
                            );
                        }

                        setOtherRiders(otherRiders);
                        if(otherRiders.length > 1){
                            let text = "You and "+ (otherRiders.length -1) + " other rider" +((otherRiders.length - 1) > 1 ? "s" : "") + " are sharing this ride";

                            setGroupText(text);
                        }
                        else{
                            setGroupText("You are the only rider in this ride group... waiting for timeout");
                        }

                    }); 

                    //timer
                    db.ref(`${groupUrl}/timer`).on("value", (snapshot) => {
                        let currentTime = snapshot.val();
                        setTimer(timeFormatter(currentTime));

                        //show pickup point then assign drivers
                        if(currentTime == 0){

                        }
                    });

                    //maintain online status of others
                }
            );
        })();
    }, []);

    useEffect(() => {
        if (status === 2) {
            navigation.navigate("Pickup");
        }
    }, [status]);

    useEffect(() => {
        if(routeInfo && routeInfo.deleted){
           let groupUrl = `groups/gid-${routeInfo.groupId}`;
           db.ref(`${groupUrl}/fares/uid-${routeInfo.userId}`).off();
           db.ref(`${groupUrl}/locations`).off(); 
           db.ref(`${groupUrl}/usersIndex`).off();
           otherRiders.forEach(riderId => {
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
                <View>{renderStatus()}</View>
                {renderPrice()}
            </View>
            <View style={tw`p-2`}>
                <TextField
                    iconName="place"
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
                <Spacer height={4} />
                {renderDriverItem()}
                <Spacer height={5} />

                <View style={tw`bg-red-400 p-2`}>
                    <Button
                        text="Cancel ride"
                        iconName="close"
                        onPress={() => {

                            //cancelling ride here. Ensure to put some progress bar here
                            cancelRide(routeInfo, user).then((response) => {
                                let jRes = response.data;
                                Log("CancelRide Response: ", jRes );
                                if(jRes.status == "OK"){
                                    let deletedRouteInfo = routeInfo;
                                    deletedRouteInfo.deleted = true;
                                    setRouteInfo(deletedRouteInfo);
                                    

                                    navigation.navigate("RideTypeChooser");
                                    setDest(null);
                                    return;
                                }
                                
                                Alert(JSON.parse(jRes.message));
                            })
                            .catch(error => {
                                //show error
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
        return status >= 1 && <PriceLabel price={price} header="KES" />;
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
                            <MaterialIcons
                                name="check"
                                color={colors.success}
                                size={20}
                            />

                            <Text style={[tw`text-gray-500 ml-2 `, styles.fi]}>
                                Your driver is Jake
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
