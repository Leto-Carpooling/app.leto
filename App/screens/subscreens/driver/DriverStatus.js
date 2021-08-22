import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import SwitchButton from "../../../components/btn/SwitchButton";
import FontStyles from "../../../components/FontStyles";
import Spacer from "../../../components/Spacer";
import LogoTagline from "../../../components/text/LogoTagline";

const DriverStatus = () => {
    const [on, setOn] = useState(false);
    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`p-4`}>
                <LogoTagline />
            </View>
            <View style={tw`bg-gray-100 flex-1 p-4`}>
                <SwitchButton on={on} setOn={setOn} />
                <Spacer height={10} />
                {renderStatusTxt()}
            </View>
        </View>
    );

    function renderStatusTxt() {
        return on ? (
            <View style={tw`flex-col`}>
                <Text style={[tw`text-gray-600 text-3xl`, FontStyles.fp]}>
                    Online
                </Text>
                <Text style={[tw`text-gray-500 mt-1`, FontStyles.fi]}>
                    Waiting for ride requests..
                </Text>
            </View>
        ) : (
            <View style={tw`flex-col`}>
                <Text style={[tw`text-gray-600 text-3xl`, FontStyles.fp]}>
                    Offline
                </Text>
                <Text style={[tw`text-gray-500 mt-1`, FontStyles.fi]}>
                    You are not accepting rides.
                </Text>
            </View>
        );
    }
};

export default DriverStatus;

const styles = StyleSheet.create({});
