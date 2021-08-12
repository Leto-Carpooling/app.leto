import axios from "axios";
import constants from "../util/constants";

export const api = axios.create({
    baseURL: constants.serverUrl,
});
