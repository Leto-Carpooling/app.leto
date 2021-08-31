import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/core";
import { AppContext } from "../../../util/AppContext";

import fonts from "../../../assets/fonts/fonts";

import { Button } from "../../../components/btn/Button";
import DriverItem from "../../../components/display/DriverItem";
import PlaceView from "../../../components/display/PlaceView";
import Spacer from "../../../components/auxx/Spacer";

const Pickup = () => {
    const navigation = useNavigation();
    const { origin } = useContext(AppContext);
    return (
        <View style={tw`flex-1 bg-white`}>
            <Text style={[tw`text-2xl text-gray-600 m-4`, styles.fp]}>
                Go to pickup point
            </Text>
            <PlaceView
                place={{
                    mainText: origin.name,
                    secondaryText: origin.secondaryText,
                }}
            />
            <Spacer height={5} />
            <View style={[tw`p-2`]}>
                <DriverItem />
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
