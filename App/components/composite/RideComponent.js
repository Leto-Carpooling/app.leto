import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import colors from "../../assets/colors/colors";
import { Avatar } from "../img/Avatar";
import FontStyles from "../../assets/fonts/FontStyles";
import PriceLabel from "../display/PriceLabel";
import { MaterialIcons } from "@expo/vector-icons";
const RideComponent = ({ actionText, onPress }) => {
    const [riders, setRiders] = useState([
        { name: "John" },
        { name: "Kevin" },
        { name: "Alvin" },
        { name: "Mike" },
    ]);
    return (
        <View style={[tw`rounded-md shadow bg-gray-50 flex-row`]}>
            <View style={[tw`w-1/2 p-2 rounded-l-md`]}>
                <Text style={[tw`text-gray-500`, FontStyles.fpm]}>Riders</Text>
                <View style={tw`flex-row flex-wrap`}>
                    {riders.map((rider, index) => (
                        <RiderAvatar key={index} name={rider.name} />
                    ))}
                </View>
            </View>
            <View style={[tw`w-1/2 bg-gray-100 rounded-r-md justify-between`]}>
                <View
                    style={tw`pt-4 px-2 flex-row justify-end flex-1 rounded-tr-md items-center`}
                >
                    <PriceLabel price={300} header="TOTAL" />
                </View>
                <TouchableOpacity
                    style={[
                        { backgroundColor: colors.primary },
                        tw`h-1/3 rounded-br-md justify-center items-center`,
                    ]}
                    onPress={onPress}
                >
                    <Text style={[tw`text-white`, FontStyles.fim]}>
                        {actionText}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const RiderAvatar = ({ url, name }) => {
    return (
        <View style={tw`m-1 flex-col items-center`}>
            <Avatar size={40} src="https://picsum.photos/200/300" test />
            <View style={[tw`flex-row items-center`]}>
                <MaterialIcons name="check" color={colors.success} size={13} />
                <Text style={[tw`text-xs text-gray-500 mt-1`, FontStyles.fi]}>
                    {name}
                </Text>
            </View>
        </View>
    );
};

export default RideComponent;

const styles = StyleSheet.create({});
