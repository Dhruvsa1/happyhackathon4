import axios from "axios";
const BASE_URL: string =
  import.meta.env.VITE_API_REQUEST_URL_DEV || "defaultUrl";



export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
