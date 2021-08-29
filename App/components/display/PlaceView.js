import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import fonts from "../../assets/fonts/fonts";
import colors from "../../assets/colors/colors";

const PlaceView = ({ place, onPress }) => {
    return (
        <TouchableOpacity
            style={tw`bg-gray-100 rounded p-2 flex-row items-center mb-1 w-full`}
            onPress={onPress}
        >
            <MaterialIcons
                name="place"
                size={30}
                color={colors.primary}
                style={tw`mr-2`}
            />
            <View style={[tw`w-full`]}>
                <Text
                    numberOfLines={1}
                    style={[
                        tw`text-gray-600 text-lg w-11/12 pr-5`,
                        { fontFamily: fonts.interMedium },
                    ]}
                >
                    {place.mainText}
                </Text>
                <Text
                    numberOfLines={1}
                    style={[
                        tw`text-gray-500 text-sm w-11/12 pr-5`,
                        { fontFamily: fonts.interMedium },
                    ]}
                >
                    {place.secondaryText}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default PlaceView;
