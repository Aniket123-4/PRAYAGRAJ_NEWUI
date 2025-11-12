import axios from "axios";

// export const HOST_URL = "http://localhost:8000/api/";
export const HOST_URL = "https://prayaglibapi.mssplonline.com/api/";

const api = axios.create({
  baseURL: HOST_URL,
});

export default api;


