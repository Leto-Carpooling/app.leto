import React, { useContext, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from "react-native-maps";
import { AppContext } from "../../util/AppContext";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";

const Map = () => {
    const { origin, dest } = useContext(AppContext);
    const mapRef = React.useRef(null);

    useEffect(() => {
        if (origin) {
            mapRef.current.animateToRegion({
                latitude: origin.lat,
                longitude: origin.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        }
    }, [origin]);

    useEffect(() => {
        if (!origin || !dest) return;

        mapRef.current.fitToSuppliedMarkers(["origin", "destination"]);
    }, [origin, dest]);

    return (
        <MapView
            style={{ height: "75%" }}
            mapType="mutedStandard"
            ref={mapRef}
            initialRegion={{
                latitude: origin ? origin.lat : 0,
                longitude: origin ? origin.lng : 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && dest && (
                <MapViewDirections
                    origin={{
                        latitude: origin.lat,
                        longitude: origin.lng,
                    }}
                    destination={{
                        latitude: dest.lat,
                        longitude: dest.lng,
                    }}
                    lineDashPattern={[1]}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={5}
                    strokeColor="black"
                    onReady={(result) => {
                        // console.log(result);
                    }}
                />
            )}
            {origin && (
                <Marker
                    coordinate={{
                        latitude: origin.lat,
                        longitude: origin.lng,
                    }}
                    title={origin.mainText}
                    description={origin.secondaryText}
                    identifier="origin"
                />
            )}
            {dest && (
                <Marker
                    coordinate={{
                        latitude: dest.lat,
                        longitude: dest.lng,
                    }}
                    title="You"
                    description={"Destination"}
                    identifier="destination"
                />
            )}

            {origin && (
                <Marker
                    coordinate={{
                        latitude: origin.lat + 0.00095,
                        longitude: origin.lng,
                    }}
                    image={require("../../assets/img/car_top_view.png")}
                />
            )}
        </MapView>
    );
};

export default Map;
