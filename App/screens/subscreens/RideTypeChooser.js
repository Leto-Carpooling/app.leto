import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import LogoTagline from "../../components/text/LogoTagline";
import fonts from "../../assets/fonts/fonts";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";

import CardButton from "../../components/btn/CardButton";

const RideTypeChooser = () => {
    const navigation = useNavigation();
    return (
        <View style={tw`flex-1 bg-white p-4`}>
            <Text style={[tw`text-2xl text-gray-500 mb-2`, styles.fontPoppins]}>
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
                        navigation.navigate("WhereTo");
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
                />
            </View>
        </View>
    );
};

export default RideTypeChooser;

const styles = StyleSheet.create({
    fontPoppins: {
        fontFamily: fonts.poppinsRegular,
    },
});
