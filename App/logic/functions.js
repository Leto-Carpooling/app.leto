import { Log } from "../util/Logger";
import { api } from "../util/api";

/**
 *
 * @param {int} groupId
 * @param {Object} user
 * @param {Function} callback - callback(message, groupId)
 */
export const getFare = async function (groupId, user, callback) {
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            auth: user.token,
        },
    };
    Log("getFare: 16 making request", groupId);
    const formData = new FormData();
    formData.append("group-id", groupId);

    api.post(`route/calculateFare.php`, formData, config)
        .then((resp) => {
            Log("Getting fare in herec", resp.data);

            if (resp.data.status == "OK") {
                callback(JSON.parse(resp.data.message), groupId);
            } else {
                Log("Error from calculate fare:", resp.data.message);
            }
        })
        .catch((err) => {
            Log("Getting fare", err);
        });
};

export const cancelRide = async function (routeInfo, user) {
    Log("Cancel Ride: making 37 request", routeInfo);
    const config = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            auth: user.token,
        },
    };
    let formData = new FormData();
    formData.append("route-info", JSON.stringify(routeInfo));
    return await api.post(`route/cancel.php`, formData, config);
};
/**
 *
 * @param {int} seconds
 * @param {boolean} withHours - should the hours shown in the formatted time.
 */
export const timeFormatter = (seconds, withHours = false) => {
    let s = seconds % 60;
    let m = Math.trunc(seconds / 60) % 60;
    let h = Math.trunc(seconds / 3600) % 24;

    return `${withHours ? `${h}:` : ""} ${m}:${s}`;
};
