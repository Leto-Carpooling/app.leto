import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import StarRating from "react-native-star-rating";
import { useNavigation } from "@react-navigation/core";

import colors from "../../../assets/colors/colors";

import FontStyles from "../../../assets/fonts/FontStyles";
import PriceLabel from "../../../components/display/PriceLabel";
import { TextField } from "../../../components/input/TextField";
import Spacer from "../../../components/aux/Spacer";
import { Button } from "../../../components/btn/Button";
import LogoTagline from "../../../components/display/LogoTagline";

const Arrived = () => {
    const [starCount, setStarCount] = useState(0);
    const [comment, onChangeComment] = useState("");
    const navigation = useNavigation();

    return (
        <View style={tw`flex-1 bg-white`}>
            <Text style={[tw`text-2xl text-gray-600 mt-4 mx-4`, FontStyles.fp]}>
                You've arrived
            </Text>
            <View style={[tw`flex-row py-2 px-4 justify-between `]}>
                <View>
                    <Text style={[tw`text-gray-500 text-lg`, FontStyles.fi]}>
                        How was your ride?
                    </Text>
                </View>
                <PriceLabel price={110} header="KES" />
            </View>
            <View style={tw`px-7 m-4`}>
                <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={starCount}
                    selectedStar={(rating) => setStarCount(rating)}
                    starSize={30}
                    fullStarColor={colors.primary}
                />
            </View>
            <View style={[tw`p-4`]}>
                <TextField
                    iconName="comment"
                    placeholder="Add a comment"
                    value={comment}
                    onChangeText={onChangeComment}
                />
                <Spacer height={15} />
                <Button text="Send" iconName="send" onPress={sendRating} />
                <Spacer height={20} />
                <LogoTagline />
            </View>
        </View>
    );

    function sendRating() {
        navigation.reset({
            index: 0,
            routes: [{ name: "RideTypeChooser" }],
        });
    }
};

export default Arrived;

const styles = StyleSheet.create({});
