import axios from "axios";

export const api = axios.create({
    baseURL: `https://d0082b2cb510.ngrok.io/leto_apis/OT_server/src`,
});
