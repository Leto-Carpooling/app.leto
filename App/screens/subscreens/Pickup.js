import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import fonts from "../../assets/fonts/fonts";
import { Button } from "../../components/Button";
import DriverItem from "../../components/DriverItem";
import PlaceView from "../../components/PlaceView";
import Spacer from "../../components/Spacer";
import { useNavigation } from "@react-navigation/core";
import { AppContext } from "../../util/AppContext";

const Pickup = () => {
    const navigation = useNavigation();
    return (
        <View style={tw`flex-1 bg-white`}>
            <Text style={[tw`text-2xl text-gray-600 m-4`, styles.fp]}>
                Go to pickup point
            </Text>
            <PlaceView
                place={{
                    mainText: "Strathmore University",
                    secondaryText: "Ole Sangale Rd.",
                }}
            />
            <Spacer height={5} />
            <View style={[tw`p-2`]}>
                <DriverItem />
                <Spacer height={10} />
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
