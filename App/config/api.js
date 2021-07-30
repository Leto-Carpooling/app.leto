import axios from "axios";

export const api = axios.create({
    baseURL: `https://70ac25e806f1.ngrok.io/leto_apis/OT_server/src`,
});
