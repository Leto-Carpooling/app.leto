import React from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../../../assets/colors/colors";
import fonts from "../../../assets/fonts/fonts";

import LogoTagline from "../../../components/display/LogoTagline";
import Spacer from "../../../components/auxx/Spacer";
import CardButton from "../../../components/btn/CardButton";

const RideTypeChooser = () => {
    const navigation = useNavigation();
    return (
        <View style={tw`flex-1 bg-white p-4`}>
            <Text style={[tw`text-2xl text-gray-500 mb-3`, styles.fontPoppins]}>
                Select ride type
            </Text>

            <View style={tw`flex-row items-center justify-around`}>
                <CardButton
                    label="Shared ride"
                    icon={
                        <MaterialIcons
                            name="groups"
                            size={40}
                            color={colors.textDarker}
                        />
                    }
                    onPress={() => {
                        navigation.navigate("WhereTo", { rideType: 0 });
                    }}
                />
                <CardButton
                    label="Solo ride"
                    icon={
                        <MaterialIcons
                            name="person"
                            size={40}
                            color={colors.textDarker}
                        />
                    }
                    onPress={() => {
                        navigation.navigate("WhereTo", { rideType: 0 });
                    }}
                />
            </View>
            <Spacer height={20} />
            <LogoTagline />
        </View>
    );
};

export default RideTypeChooser;

const styles = StyleSheet.create({
    fontPoppins: {
        fontFamily: fonts.poppinsRegular,
    },
});
