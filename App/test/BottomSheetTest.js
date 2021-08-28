import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import colors from "../assets/colors/colors";
import PlaceView from "../components/PlaceView";
import { ScrollView } from "react-native-gesture-handler";
import { TextField } from "../components/TextField";

export default () => {
    const [views, setViews] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["25%", "50%"], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log("handleSheetChanges", index);
    }, []);

    // renders
    return (
        <View style={styles.container}>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.contentContainer}>
                    <TextField />
                    <ScrollView style={{ flex: 1 }}>
                        {views.map((view) => (
                            <PlaceView
                                key={view}
                                place={{
                                    mainText: "Main Text",
                                    secondaryText: "Secondary text",
                                }}
                                onPress={() => alert(view)}
                            />
                        ))}
                    </ScrollView>
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: colors.primary,
    },
    contentContainer: {
        flex: 1,
    },
});
