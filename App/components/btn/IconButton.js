import React from "react";
import { TouchableOpacity } from "react-native";

export const IconButton = ({ icon, onPress }) => {
    return <TouchableOpacity onPress={onPress}>{icon}</TouchableOpacity>;
};
