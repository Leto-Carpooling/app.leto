import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import fonts from "../../assets/fonts/fonts";
import { color } from "jimp";
import colors from "../../assets/colors/colors";
import { TextField } from "../../components/TextField";
import Spacer from "../../components/Spacer";
import { api } from "../../config/api";
import axios from "axios";
import PlaceView from "../../components/PlaceView";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/core";
import { AppContext } from "../../util/AppContext";

const WhereTo = () => {
    const navigation = useNavigation();
    const [whereTo, onChangeWhereTo] = useState("");
    const [whereFrom, onChangeWhereFrom] = useState("Current location");
    const [timeoutId, setTimeoutId] = useState(null);
    // const [origin, setOrigin] = useState(null);
    // const [dest, setDest] = useState(null);
    const { origin, setOrigin, setDest, dest } = useContext(AppContext);
    const [places, setPlaces] = useState([]);
    const [isTo, setIsTo] = useState(false);

    useEffect(() => {
        if (dest != null && origin != null) {
            navigation.navigate("HangTight");
        }
    }, [dest]);

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            if (whereTo != "") {
                setIsTo(true);
                getPlaces(whereTo, setPlaces);
            }
        }, 400);
        setTimeoutId(newTimeoutId);
    }, [whereTo]);

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            if (whereFrom != "" && whereFrom != "Current location") {
                setIsTo(false);
                getPlaces(whereFrom, setPlaces);
            }
        }, 400);
        setTimeoutId(newTimeoutId);
    }, [whereFrom]);
    return (
        <View style={tw`flex-1 bg-white flex-col p-2`}>
            <Text
                style={[
                    tw`text-2xl text-gray-600 ml-2 mb-2`,
                    styles.fontPoppins,
                ]}
            >
                Where to?
            </Text>
            <View style={tw`p-2`}>
                <TextField
                    iconName="place"
                    placeholder="Where from?"
                    value={whereFrom}
                    onChangeText={onChangeWhereFrom}
                />
                <Spacer height={1} />
                <TextField
                    iconName="place"
                    placeholder="Where to?"
                    value={whereTo}
                    onChangeText={onChangeWhereTo}
                />
            </View>
            <View style={tw`p-2`}>
                {places.map((place, index) => (
                    <PlaceView
                        key={index}
                        place={place}
                        onPress={() => handlePress(place)}
                    />
                ))}
            </View>
        </View>
    );

    function handlePress(place) {
        console.log(place);
        if (isTo) {
            onChangeWhereTo(place.name);
            setDest({
                lat: place.loc.lat,
                lng: place.loc.lng,
                name: place.name,
            });
        } else {
            onChangeWhereFrom(place.name);
            setOrigin({
                lat: place.loc.lat,
                lng: place.loc.lng,
                name: place.name,
            });
        }
    }
};

function getPlaces(whereTo, setPlaces) {
    var config = {
        method: "get",
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${whereTo}&inputtype=textquery&language=en&fields=formatted_address,name,geometry&key=${GOOGLE_MAPS_API_KEY}`,
        headers: {},
    };

    axios(config)
        .then(function (response) {
            const candidates = response.data.candidates;
            const results = [];
            candidates.forEach((cand) => {
                results.push({
                    name: cand.name,
                    addr: cand.formatted_address,
                    loc: cand.geometry.location,
                });
            });
            //console.log(results);
            setPlaces(results);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export default WhereTo;

const styles = StyleSheet.create({
    fontPoppins: {
        fontFamily: fonts.poppinsRegular,
    },
});
