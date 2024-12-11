import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/core";

import colors from "../../../assets/colors/colors";
import RideComponent from "../../../components/composite/RideComponent";
import FontStyles from "../../../assets/fonts/FontStyles";
import Spacer from "../../../components/auxx/Spacer";
import PlaceView from "../../../components/display/PlaceView";

const RideStatus = () => {
    const [status, setStatus] = useState(0);
    const navigation = useNavigation();
    const { snapToIndex } = useBottomSheet();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        switch (status) {
            case 0:
                snapToIndex(2);
                break;
            case 1:
                snapToIndex(1);
                break;
            case 3:
                snapToIndex(1);
                break;
        }
    }, [status]);
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
                    loading={loading}
                />
                {status === 0 && (
                    <TouchableOpacity
                        style={[tw`mt-3 mr-2 flex-row justify-end`]}
                        onPress={() => {
                            navigation.goBack();
                        }}
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
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setStatus(1);
                    }, 1000 * 5);
                };
            case 1:
                return () => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setStatus(2);
                    }, 1000 * 5);
                };
            case 2:
                return () => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setStatus(3);
                    }, 1000 * 5);
                };
            case 3:
                return () => {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        navigation.goBack();
                    }, 1000 * 5);
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
                            mainText: "Strathmore University",
                            secondaryText: "Ole Sangale Rd.",
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
