import axios from "axios";
import type { AxiosInstance } from "axios";

const axiosBackendInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


const axiosJoodleInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_JDOODLE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { axiosBackendInstance, axiosJoodleInstance };
