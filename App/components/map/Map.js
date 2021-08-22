import React, { useContext, useEffect, useRef } from "react";
import { View, Text } from "react-native";
import tw from "tailwind-react-native-classnames";
import MapView, { Marker } from "react-native-maps";
import { AppContext } from "../../util/AppContext";

const Map = () => {
    const { origin } = useContext(AppContext);
    const mapRef = React.useRef(null);
    {
        useEffect(() => {
            console.log(origin);
            if (origin) {
                mapRef.current.animateToRegion({
                    latitude: origin.lat,
                    longitude: origin.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                });
            }
        }, [origin]);
    }
    return (
        <MapView
            style={tw`flex-1`}
            mapType="mutedStandard"
            ref={mapRef}
            initialRegion={{
                latitude: origin ? origin.lat : 0,
                longitude: origin ? origin.lng : 0,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && (
                <Marker
                    coordinate={{
                        latitude: origin.lat + 0.9,
                        longitude: origin.lng,
                    }}
                    title="You"
                    description={"Current location"}
                />
            )}

            {origin && (
                <Marker
                    coordinate={{ latitude: origin.lat, longitude: origin.lng }}
                    image={require("../../assets/img/car_top_view.png")}
                />
            )}
        </MapView>
    );
};

export default Map;
