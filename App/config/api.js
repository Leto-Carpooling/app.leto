import axios from "axios";

export const api = axios.create({
    baseURL: `https://dd2ea36fde77.ngrok.io//leto_apis/OT_server/src`,
});
