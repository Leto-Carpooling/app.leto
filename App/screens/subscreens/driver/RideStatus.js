import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../../../assets/colors/colors";
import RideComponent from "../../../components/composite/RideComponent";
import FontStyles from "../../../assets/fonts/FontStyles";
import Spacer from "../../../components/auxx/Spacer";
import PlaceView from "../../../components/display/PlaceView";

const RideStatus = () => {
    const [status, setStatus] = useState(3);
    return (
        <View style={tw`flex-1 bg-white`}>
            <Text style={[tw`text-2xl text-gray-600 m-4`, FontStyles.fp]}>
                {renderTitle()}
            </Text>
            {renderPlaceView()}

            <View style={[tw`px-4`]}>
                <RideComponent
                    actionText={renderActionText()}
                    onPress={returnOnPress()}
                />
                {status === 0 && (
                    <TouchableOpacity
                        style={[tw`mt-3 mr-2 flex-row justify-end`]}
                    >
                        <View style={[tw`flex-row items-center`]}>
                            <MaterialIcons name="close" color={colors.danger} />
                            <Text
                                style={[tw`text-red-600 ml-2`, FontStyles.fim]}
                            >
                                Decline
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );

    function renderActionText() {
        switch (status) {
            case 0:
                return "Accept";
            case 1:
                return "I'm there";
            case 2:
                return "Start ride";
            case 3:
                return "Finish ride";
        }
    }

    function returnOnPress() {
        switch (status) {
            case 0:
                return () => {
                    alert("Incoming ride");
                };
            case 1:
                return () => {
                    alert("Go to pickup point");
                };
            case 2:
                return () => {
                    alert("Ready..");
                };
            case 3:
                return () => {
                    alert("In transit");
                };
        }
    }

    function renderTitle() {
        switch (status) {
            case 0:
                return "Incoming ride";
            case 1:
                return "Go to pickup point";
            case 2:
                return "Ready..";
            case 3:
                return "In transit";
        }
    }

    function renderPlaceView() {
        return (
            status == 1 && (
                <>
                    <PlaceView
                        place={{
                            name: "Strathmore University",
                            addr: "Ole Sangale Rd.",
                        }}
                    />
                    <Spacer height={20} />
                </>
            )
        );
    }
};

export default RideStatus;

const styles = StyleSheet.create({});
