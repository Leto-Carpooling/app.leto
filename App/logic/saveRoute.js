import { api } from "../util/api";
import { Log } from "../util/Logger";
import {
    writeToDatabase,
    deleteFromDatabase,
    updateDatabase,
} from "./rtdbFunctions";
import firebase from "firebase/app";

/**
 * This function saves the route to firebase after receiving its id from the OT server.
 * Every user can only have one active route, so every other uncompleted routes will be deleted
 * and completed routes will remain
 * @param {MapAPIRoute} route
 * @param {Function} callback - the callback function to handle the response.
 *
 */

export const saveRoute = (route, groupTimer, user, db, rideType, callback) => {
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            auth: user.token,
        },
    };

    const formData = new FormData();
    let route0leg0 = route.routes[0].legs[0];
    let start_latitude = route0leg0.start_location.lat;
    let start_longitude = route0leg0.start_location.lng;
    let end_latitude = route0leg0.end_location.lat;
    let end_longitude = route0leg0.end_location.lng;
    let startPlaceId = route.geocoded_waypoints[0].place_id;
    let endPlaceId =
        route.geocoded_waypoints[route.geocoded_waypoints.length - 1].place_id;

    let routePoints = {
        start_latitude,
        start_longitude,
        end_latitude,
        end_longitude,
        rideType,
        startPlaceId,
        endPlaceId,
        groupTimer,
    };

    formData.append("route-points", JSON.stringify(routePoints));

    // Log("token", user);

    api.post(`route/saveAndGroup.php`, formData, config)
        .then((resp) => {
            // Log("Adding route", resp.data);

            if (resp.data.status == "OK") {
                //deleteFromFirebase(resp, db);
                saveToFirebase(route, groupTimer, resp, db).then(callback);
            } else {
                // console.log(resp.data);
            }
        })
        .catch((err) => {
            Log("Adding route error here", err);
        });
};

/**
 * Saves the route to firebase realtime database and returns its id
 * @param {MapAPIRoute} route - from the google map api
 * @param {JSON} response - response from the OT server
 * @param {int} groupTimer - the time the user will like to wait for others to join
 */
async function saveToFirebase(route, groupTimer, response, db) {
    let message = JSON.parse(response.data.message);
    //Log("msg", message);

    let routeId = message.routeId;
    let userId = message.userId;
    let groupId = message.groupId;
    let route0 = route.routes[0];
    let groupExists = message.groupExists;

    let legs = route0.legs;

    //save the geocoded_waypoint
    let geocodedWp = route.geocoded_waypoints;
    delete route.geocoded_waypoints;
    await writeToDatabase(
        `routes/gwp/rid-${routeId}`,
        {
            geocoded_waypoints: geocodedWp,
        },
        db
    );

    //save the route
    let routeMeta = {
        userId,
        bounds: route0.bounds,
        copyrights: route0.copyrights,
        startPlaceId: geocodedWp[0].place_id,
        endPlaceId: geocodedWp[geocodedWp.length - 1].place_id,
        overview_polyline: route0.overview_polyline,
        summary: route0.summary,
        warnings: route0.warnings,
        waypoint_order: route0.waypoint_order,
    };

    await writeToDatabase(`routes/rid-${routeId}`, routeMeta, db);

    //save the legs
    legs.forEach((leg, index) => {
        let steps = leg.steps;
        delete leg.steps;
        writeToDatabase(
            `routes/legs/rid-${routeId}`,
            {
                index,
                leg,
            },
            db
        );

        //save the steps of this leg
        writeToDatabase(
            `routes/steps/rid-${routeId}/leg-${index}`,
            {
                steps,
            },
            db
        );
    });

    //save the group
    let usersIndex = {};
    let locations = {};
    let fares = {};
    let onlineStatus = {};

    usersIndex[`uid-${userId}`] = true;

    locations[`uid-${userId}`] = {
        startPlaceId: geocodedWp[0].place_id,
        endPlaceId: geocodedWp[geocodedWp.length - 1].place_id,
    };

    fares[`uid-${userId}`] = "-"; //will calculate fare later.

    onlineStatus[`uid-${userId}`] = {
        updated: firebase.database.ServerValue.TIMESTAMP,
    };

    // Log("151", groupId);
    let updates = {};
    updates[`groups/gid-${groupId}/usersIndex/uid-${userId}`] = true;
    updates[`groups/gid-${groupId}/locations/uid-${userId}`] =
        locations[`uid-${userId}`];
    updates[`groups/gid-${groupId}/fares/uid-${userId}`] =
        fares[`uid-${userId}`];
    updates[`groups/gid-${groupId}/onlineStatus/uid-${userId}`] =
        onlineStatus[`uid-${userId}`];

    await updateDatabase(updates, db);

    return {
        groupId,
        userId,
        routeId,
        groupTimer,
        groupExists,
        deleted: false,
    };
}

/**
 * Deletes a route from the realtime database on firebase.
 * It also deletes the user id from the group that this route is a part of
 *
 * @param {MapApiRoute} route - from the google map api
 * @param {JSON} response - response from the OT server
 */
function deleteFromFirebase(response, db) {
    let message = JSON.parse(response.data.message);
    //console.log(message);

    //delete from groups
    if (message.deletedGroups.length > 0) {
        message.deletedGroups.forEach((groupId) => {
            deleteFromDatabase(`groups/gid-${groupId}`, db);
        });
    }

    //delete from the routes
    if (message.deletedRoutes.length > 0) {
        message.deletedRoutes.forEach((routeId) => {
            //delete steps
            deleteFromDatabase(`routes/steps/rid-${routeId}`, db);

            //delete legs
            deleteFromDatabase(`routes/legs/rid-${routeId}`, db);

            //delete gwp
            deleteFromDatabase(`routes/gwp/rid-${routeId}`, db);

            //delete from routes
            deleteFromDatabase(`routes/rid-${routeId}`, db);
        });
    }
}
