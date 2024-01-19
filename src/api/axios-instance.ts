import axios from "axios";
import type { AxiosInstance } from "axios";

console.log(
  "process.env.REACT_APP_BACKEND_API_URL",
  process.env.REACT_APP_BACKEND_API_URL
);

const axiosBackendInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { axiosBackendInstance };
