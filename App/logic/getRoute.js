import { GOOGLE_MAPS_API_KEY } from "@env";

export const getRoute = async function (startPlaceId, endPlaceId) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?
        origin=place_id:${startPlaceId}
        &destination=place_id:${endPlaceId}
        &key=${GOOGLE_MAPS_API_KEY}`);
        let route = await resp.json();
        return route;
    } 
    
    catch(error) {
        return error
    }
};
