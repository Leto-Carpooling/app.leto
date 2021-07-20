import axios from "axios";

export const api = axios.create({
    baseURL: `http://10.20.195.72/leto_apis/OT_server/src`,
});
