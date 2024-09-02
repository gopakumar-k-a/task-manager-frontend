import axios from "axios";
import { Constants } from "../../constants/Constants";
import { handleAxiosErrorHelper } from "../../utils/helpers/handleAxiosErrorHelper";

export const axiosRefreshInstance = axios.create({
  baseURL: Constants.SERVER_URL,
  withCredentials: true,
});

export const axiosUserInstance = axios.create({
  baseURL: Constants.SERVER_URL,
  withCredentials: true,
});

axiosRefreshInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    handleAxiosErrorHelper(error);

    return Promise.reject(error);
  }
);
axiosUserInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    handleAxiosErrorHelper(error);

    return Promise.reject(error);
  }
);
axiosUserInstance.interceptors.request.use(
  (request) => {

    const user = localStorage.getItem("user");
  let token = null;
  if (user) {
    token = JSON.parse(user);
  }


    if (token) {
      request.headers["Authorization"] = `Bearer ${token.token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
