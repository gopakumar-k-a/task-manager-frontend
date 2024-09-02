import { END_POINTS } from "../../constants/endPoints";
import { axiosUserInstance } from "../axiosInstance/axiosUserInstance";

export const uploadImages = async (payload) => {
  const response = await axiosUserInstance.post(
    END_POINTS.UPLOAD_IMAGES,
    payload
  );

  return response.data;
};

export const getUploadedImages = async () => {
  const response = await axiosUserInstance.get(END_POINTS.UPLOAD_IMAGES);
  return response.data;
};

export const updateImage = async (payload) => {
  const response = await axiosUserInstance.patch(
    END_POINTS.UPLOAD_IMAGES,
    payload
  );
  return response.data;
};
