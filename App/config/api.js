import axios from "axios";

export const api = axios.create({
    baseURL: `http://10.55.24.159/leto_apis/OT_server/src/`,
});
