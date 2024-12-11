import React, { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/core";
import { AppContext } from "../../../util/AppContext";

import fonts from "../../../assets/fonts/fonts";

import { Button } from "../../../components/btn/Button";
import DriverItem from "../../../components/display/DriverItem";
import PlaceView from "../../../components/display/PlaceView";
import Spacer from "../../../components/auxx/Spacer";
import { getDriverInfo } from "../../../logic/functions";

const Pickup = ({route}) => {
    const navigation = useNavigation();
    const { origin, user, db } = useContext(AppContext);
    const {routeInfo, driverId, pickup} = route.params;
    const [driver, setDriver] = useState({
        name: "fetching",
        vehicle: {
            licensePlate: "fetching"
        },
        totalRides: "fetching"
    });

    getDriverInfo(driverId, user ).then(response => {
        if(response.data.status == "OK"){
            let driver = JSON.parse(response.data.message);
            setDriver(driver);
        }
        else{

        }
    })
    .catch(err => {
        Alert.alert("Error", "Could not fetch Driver information");
    })

    let groupUrl = `groups/gid-${routeInfo.groupId}`;
    let driverUrl = `drivers/did-${driverId}/cLocation`;

    //render driver in here
    db.ref(`${driverUrl}`).on("value", (snapshot) => {

    });

    return (
        <View style={tw`flex-1 bg-white`}>
            <Text style={[tw`text-2xl text-gray-600 m-4`, styles.fp]}>
                Go to pickup point
            </Text>
            <PlaceView
                place={{
                    mainText: pickup.name,
                    secondaryText: pickup.secondaryName,
                }}
            />
            <Spacer height={5} />
            <DriverItem />
            <Spacer height={5} />
            <View style={[tw`p-2`]}>
                <DriverItem driver={driver} />
                <Spacer height={20} />
                <Button
                    text="I have arrived"
                    iconName="place"
                    onPress={() => {
                        navigation.navigate("InTransit");
                    }}
                />
            </View>
        </View>
    );
};

export default Pickup;

const styles = StyleSheet.create({
    fp: {
        fontFamily: fonts.poppinsRegular,
    },
    fi: {
        fontFamily: fonts.interRegular,
    },
});
