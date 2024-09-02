import { END_POINTS } from "../../constants/endPoints";
import { axiosRefreshInstance } from "../axiosInstance/axiosUserInstance";

export const signUp = async (payload) => {
  const response = await axiosRefreshInstance.post(
    END_POINTS.REGISTER_USER,
    payload
  );

  return response.data;
};

export const logInApi = async (payload) => {
  const response = await axiosRefreshInstance.post(END_POINTS.LOG_IN_USER,payload);

  return response.data;
};
