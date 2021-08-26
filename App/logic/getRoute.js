import { api } from "../config/api";
import React, { useContext } from "react";
import { AppContext } from "../util/AppContext";
import { Log } from "../util/Logger";

export const getRoute = async function (startPlaceId, endPlaceId) {
    return api.post(url, {});
};
