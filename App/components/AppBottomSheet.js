import React, { useCallback, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import colors from "../assets/colors/colors";
import PlaceView from "../components/PlaceView";
import { ScrollView } from "react-native-gesture-handler";
import { TextField } from "../components/TextField";
import tw from "tailwind-react-native-classnames";

export default ({ children }) => {
    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "80%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChanges", index);
    }, []);

    // renders
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >
            <View style={[tw`flex-1`]}>{children}</View>
        </BottomSheet>
    );
};
