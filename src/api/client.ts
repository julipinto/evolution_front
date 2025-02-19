import axios from "axios";
import history from "../utils/history";
import { HOST_API } from "../config";

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem("auth_token");
      history.push("/auth");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
