import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/core";

import colors from "../../../assets/colors/colors";
import DriverItem from "../../../components/display/DriverItem";
import FontStyles from "../../../assets/fonts/FontStyles";
import PlaceView from "../../../components/display/PlaceView";

const InTransit = () => {
    const [status, setStatus] = useState(1);
    const navigation = useNavigation();
    navigation.navigate("Arrived");
    return (
        <View style={[tw`flex-1 bg-white`]}>
            <Text style={[tw`text-2xl text-gray-600 mt-4 mx-4`, FontStyles.fp]}>
                {renderStatusText()}
            </Text>

            <View style={tw`flex-row justify-start px-4 m-2`}>
                <ActivityIndicator size="small" color={colors.primary} />
            </View>

            <Text style={[tw`text-sm text-gray-500 mx-2`, FontStyles.fim]}>
                Driver
            </Text>
            <View style={tw`p-2`}>
                <DriverItem />
            </View>

            <Text style={[tw`text-sm text-gray-500 m-2`, FontStyles.fim]}>
                Destination
            </Text>
            <PlaceView
                place={{
                    name: "Strathmore University",
                    addr: "Ole Sangale Rd.",
                }}
            />
        </View>
    );

    function renderStatusText() {
        return status === 0 ? "Waiting for driver to start" : "In transit";
    }
};

export default InTransit;

const styles = StyleSheet.create({});
