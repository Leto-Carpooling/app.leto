import React from "react";
import { Text, View } from "react-native";
import FontStyles from "../../assets/fonts/FontStyles";
import tw from "tailwind-react-native-classnames";

const PriceLabel = ({ price, header }) => {
    return (
        <View style={[tw`flex-row`]}>
            <Text style={[FontStyles.fi, tw`text-gray-500 text-xs mr-1`]}>
                {header}
            </Text>
            <Text style={[FontStyles.fp, tw`text-gray-600 text-3xl`]}>
                {price}
            </Text>
        </View>
    );
};

export default PriceLabel;
