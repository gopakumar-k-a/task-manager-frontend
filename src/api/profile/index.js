import { END_POINTS } from "../../constants/endPoints";
import { axiosUserInstance } from "../axiosInstance/axiosUserInstance";

export const updatePassword = async (payload) => {
  const response = await axiosUserInstance.patch(
    ` ${END_POINTS.UPDATE_PASSWORD}/`,
    payload
  );
  return response.data;
};
