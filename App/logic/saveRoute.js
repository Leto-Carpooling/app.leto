import { api } from "../config/api";
import React, { useContext } from "react";
import { AppContext } from "../util/AppContext";
import { Log } from "../util/Logger";

const { db, user } = useContext(AppContext);

/**
 * Writes to the firebase database
 * @param {string} url - the string of the path to which you are writing
 * @param {JSON} data - the json data you want to write to the database
 * @param {firebase.database.Database} db - the firebase database object
 */
export const writeToDatabase = async (url, data, db) => {
    return await db.ref(url).set(data);
};

/**
 * Delete from firebase realtime db
 * @param {string} url
 * @param {firebase.database.Database} db
 */
export const deleteFromDatabase = async (url, db) => {
    return await db.ref(url).remove();
};

/**
 * This function saves the route to firebase after receiving its id from the OT server.
 * Every user can only have one active route, so every other uncompleted routes will be deleted
 * and completed routes will remain
 *
 * @param {MapAPIRoute} route
 * @param {Function} callback - the callback function to handle the response.
 *
 */

export default function saveRoute(route, callback) {
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            auth: user.token,
        },
    };

    const params = new URLSearchParams();
    params.append("route-id", "new");

    api.post(`route/saveRoute.php`, params, config)
        .then((resp) => {
            Log("Adding route", resp.data);

            if (resp.data.status == "OK") {
                deleteFromFirebase(route, resp);
                saveToFirebase(route, resp).then(callback);
            } else {
                console.log(resp.data);
            }
        })
        .catch((err) => {
            Log("Adding route error", err);
        });
}

/**
 * Saves the route to firebase realtime database and returns its id
 * @param {MapAPIRoute} route - from the google map api
 * @param {JSON} response - response from the OT server
 * @param {int} groupTimer - the time the user will like to wait for others to join
 */
async function saveToFirebase(route, groupTimer, response) {
    message = response.data.message;

    let routeId = message.routeId;
    let userId = message.userId;
    let groupId = message.groupId;
    let route0 = route.routes[0];

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
    usersIndex[`uid-${userId}`] = true;

    locations[`uid-${userId}`] = {
        startPlaceId: geocodedWp[0].place_id,
        endPlaceId: geocodedWp[geocodedWp.length - 1].place_id,
    };

    fares[`uid-${userId}`] = -1; //will calculate fare later.

    updated = onlineStatus[`uid-${userId}`] = {
        updated: db.ServerValue.TIMESTAMP,
    };

    await writeToDatabase(
        `groups/gid-${groupId}`,
        {
            startPlaceId: geocodedWp[0].place_id,
            endPlaceId: geocodedWp[geocodedWp.length - 1].place_id,
            usersIndex,
            pickUpPointId: geocodedWp[0].place_id,
            fares,
            locations,
            timer: groupTimer,
            onlineStatus,
        },
        db
    );

    return {
        groupId,
        userId,
        routeId,
        groupTimer,
        response,
    };
}

/**
 * Deletes a route from the realtime database on firebase.
 * It also deletes the user id from the group that this route is a part of
 *
 * @param {MapApiRoute} route - from the google map api
 * @param {JSON} response - response from the OT server
 */
function deleteFromFirebase(response) {
    let message = response.data.message;

    //delete from groups
    if (message.deletedGroups.length > 0) {
        message.deletedGroups.forEach((groupId) => {
            deleteFromDatabase(`groups/gid-${groupId}`, db);
        });
    }

    //delete from the routes
    if (message.deleteRoutes.length > 0) {
        message.deleteRoutes.forEach((routeId) => {
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
