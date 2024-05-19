import axios from "axios";
import { API_URL } from "../commom/contans";

export default axios.create({
  baseURL: API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const refresh = async () => {
  const response = await axiosPrivate.get("/api/v1/auth/refresh-token");
  return response.data.accessToken;
};

axiosPrivate.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const newAccessToken = await refresh();
      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return axiosPrivate(prevRequest);
    }
    return Promise.reject(error);
  }
);
