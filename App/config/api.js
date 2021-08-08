import axios from "axios";

export const api = axios.create({
    baseURL: `https://b68799de9586.ngrok.io/leto_apis/OT_server/src/`,
});
