import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
import { Log } from "../../util/Logger";

const WhereTo = ({ route }) => {
    const navigation = useNavigation();
    const { origin, setOrigin, setDest, dest } = useContext(AppContext);
    const [whereTo, onChangeWhereTo] = useState("");
    const [whereFrom, onChangeWhereFrom] = useState(origin.name);
    const [toLoading, setToLoading] = useState(false);
    const [fromLoading, setFromLoading] = useState(false);
    const [timeoutId, setTimeoutId] = useState(null);
    const [places, setPlaces] = useState([]);
    const [isTo, setIsTo] = useState(false);

    /** Clear results */
    useEffect(() => {
        setPlaces([]);
    }, [whereTo, whereFrom]);

    /** when both origin and destination are set route.. */
    useEffect(() => {
        if (dest != null && origin != null) {
            navigation.navigate("HangTight", route.params);
        }
    }, [dest, origin]);

    /** run timer to implement a debounce of 400ms for WhereTo */
    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        let newTimeoutId;
        if (whereTo != "" && whereTo != dest?.name) {
            setToLoading(true);
            setIsTo(true);
            newTimeoutId = setTimeout(() => {
                getPlaces(
                    whereTo,
                    setPlaces,
                    isTo,
                    setToLoading,
                    setFromLoading
                );
            }, 400);
        }
        setTimeoutId(newTimeoutId);
    }, [whereTo]);

    /** run timer to implement a debounce of 400ms for WhereFrom */
    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        let newTimeoutId;
        if (whereFrom != "" && whereFrom != origin.name) {
            setFromLoading(true);
            setIsTo(false);
            newTimeoutId = setTimeout(() => {
                getPlaces(
                    whereFrom,
                    setPlaces,
                    isTo,
                    setToLoading,
                    setFromLoading
                );
            }, 400);
        }
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
                    loading={fromLoading}
                />
                <Spacer height={1} />
                <TextField
                    iconName="place"
                    placeholder="Where to?"
                    value={whereTo}
                    onChangeText={onChangeWhereTo}
                    loading={toLoading}
                />
            </View>
            <ScrollView>
                <View style={tw`p-2`}>
                    {places.map((place, index) => (
                        <PlaceView
                            key={index}
                            place={place}
                            onPress={() => handlePress(place)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );

    /**
     *
     * @param {Object} place place object with coordinates
     * sets the location details on press.
     */
    function handlePress(place) {
        console.log(place);
        if (isTo) {
            //set text on the textfield
            var config = {
                method: "get",
                url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.placeId}&fields=geometry&key=${GOOGLE_MAPS_API_KEY}`,
                headers: {},
            };

            axios(config)
                .then(function (resp) {
                    setDest({
                        lat: resp.data.result.geometry.location.lat,
                        lng: resp.data.result.geometry.location.lng,
                        name: place.mainText,
                        placeId: place.placeId,
                    });
                    onChangeWhereTo(place.mainText);
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            var config = {
                method: "get",
                url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.placeId}&fields=geometry&key=${GOOGLE_MAPS_API_KEY}`,
                headers: {},
            };

            axios(config)
                .then(function (resp) {
                    setOrigin({
                        lat: resp.data.result.geometry.location.lat,
                        lng: resp.data.result.geometry.location.lng,
                        name: place.mainText,
                        placeId: place.placeId,
                    });
                    onChangeWhereFrom(place.mainText);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
};

function getPlaces(whereTo, setPlaces, isTo, setToLoading, setFromLoading) {
    var config = {
        method: "get",
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?components=country:ke&input=${whereTo}&types=establishment&language=en&key=${GOOGLE_MAPS_API_KEY}`,
        headers: {},
    };

    axios(config)
        .then(function (response) {
            Log("autocomplete", response.data);
            const candidates = response.data.predictions;
            const results = [];
            candidates.forEach((cand) => {
                results.push({
                    mainText: cand.structured_formatting.main_text,
                    secondaryText: cand.structured_formatting.secondary_text,
                    placeId: cand.place_id,
                });
            });
            isTo ? setToLoading(false) : setFromLoading(false);
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
