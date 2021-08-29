import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import FontStyles from "../../assets/fonts/FontStyles";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../assets/colors/colors";

const ApprovalStatus = ({ status, refresh }) => {
    return (
        <View style={[tw` p-2 flex flex-row mx-2`]}>
            <MaterialIcons
                name={status === 0 ? "pending" : "error"} //or error/pending
                color={status === 0 ? colors.primary : colors.danger} //or danger/primary
                size={40}
            />
            <View style={tw`flex flex-col px-2`}>
                <Text
                    style={[
                        tw`text-gray-500 text-lg flex-1`,
                        FontStyles.interMedium,
                        { flexWrap: "wrap" },
                    ]}
                >
                    {status === 0
                        ? "Pending approval"
                        : "Your submission was declined."}
                </Text>
                <Text
                    style={[tw`text-gray-400 text-sm`, FontStyles.interRegular]}
                >
                    {status === 0 ? (
                        <TouchableOpacity onPress={refresh}>
                            <Text style={[tw`text-blue-500`]}>Refresh</Text>
                        </TouchableOpacity>
                    ) : (
                        "You can try again."
                    )}
                </Text>
            </View>
        </View>
    );
};

export default ApprovalStatus;
