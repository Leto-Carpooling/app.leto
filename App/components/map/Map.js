import React, { useContext, useEffect, useRef, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { AppContext } from "../../util/AppContext";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_API_KEY } from "@env";

const Map = () => {
    const { origin, dest, mapDirections, riderMarkers, mIndentifiers } =
        useContext(AppContext);
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

        mapRef.current.fitToSuppliedMarkers(mIndentifiers);
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
            {/** Map directions are rendered here */}
            {mapDirections.map((direction, index) => (
                <MapViewDirections
                    key={index}
                    origin={`place_id:${direction.startPlaceId}`}
                    destination={`place_id:${direction.endPlaceId}`}
                    lineDashPattern={[1]}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={5}
                    optimizeWaypoints={true}
                    strokeColor="black"
                    onReady={(result) => {
                        // console.log(result);
                    }}
                />
            ))}

            {/**
             * Rider markers are rendered here
             */}
            {riderMarkers.map((marker, index) => {
                return (
                    <Marker
                        key={index}
                        coordinate={marker.coords}
                        title={marker.title}
                        description={marker.desc}
                        identifier={marker.identifier}
                        image={returnMarkerImage(marker.type)}
                    />
                );
            })}

            {origin && mapDirections.length < 1 && (
                <Marker
                    coordinate={{
                        latitude: origin.lat,
                        longitude: origin.lng,
                    }}
                    image={require("../../assets/img/me.png")}
                />
            )}
        </MapView>
    );
};

function returnMarkerImage(type) {
    switch (type) {
        case "rider":
            return require(`../../assets/img/rider.png`);

        case "driver":
            return require(`../../assets/img/driver.png`);

        default:
            return require(`../../assets/img/me.png`);
    }
}

export default Map;
