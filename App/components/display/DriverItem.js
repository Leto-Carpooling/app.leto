import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { Avatar } from "../img/Avatar";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";
import fonts from "../../assets/fonts/fonts";

const DriverItem = ({driver}) => {
    if(!driver){
        driver = {
            name: "fetching",
            profileImage: "./../assets/img/profile.svg",
            vehicle: {
                licensePlate: "fetching"
            },
            totalRides: "fetching"
        }
    }
    return (
        <View
            style={tw`bg-gray-100 flex-row p-3 rounded justify-between items-center`}
        >
            <Avatar size={40} src={driver.profileImage} test />
            <View style={tw`flex-col`}>
                <Text style={[styles.fi, tw`text-xl text-gray-600 mb-1`]}>
                    {driver.name}
                </Text>
                <View style={tw`flex-row items-center justify-between`}>
                    <MaterialIcons
                        name="time-to-leave"
                        size={16}
                        color={colors.primary}
                    />
                    <Text style={[styles.fi, tw`text-sm text-gray-500 ml-2`]}>
                        {driver.vehicle.licensePlate}
                    </Text>
                    <Text style={[styles.fi, tw`text-sm text-gray-500 ml-2`]}>
                        {driver.totalRides}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                style={tw`p-1 rounded-full justify-center items-center`}
            >
                <MaterialIcons name="phone" size={30} color={colors.success} />
            </TouchableOpacity>
        </View>
    );
};

export default DriverItem;

const styles = StyleSheet.create({
    fi: {
        fontFamily: fonts.interRegular,
    },
    fp: {
        fontFamily: fonts.poppinsRegular,
    },
});
