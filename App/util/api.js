import axios from "axios";
import constants from "./constants";

console.log("serverUrl: " + constants.serverUrl);
export const api = axios.create({
    baseURL: constants.serverUrl,
});
