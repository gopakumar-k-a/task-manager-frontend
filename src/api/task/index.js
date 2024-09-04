import { axiosUserInstance } from "../axiosInstance/axiosUserInstance";
import { END_POINTS } from "../../constants/endPoints";

export const addNewTask = async (payload) => {
  const response = await axiosUserInstance.post(END_POINTS.TASK_ADD, payload);
  return response.data;
};

export const getAllTasks = async () => {
  const response = await axiosUserInstance.get(END_POINTS.TASK_GET);
  return response.data;
};

export const editTask = async (payload) => {
  const response = await axiosUserInstance.patch(END_POINTS.TASK_EDIT, payload);
  return response.data;
};

export const deleteTask = async (payload) => {

  const response = await axiosUserInstance.delete(
    `${END_POINTS.TASK_DELETE}/${payload}`,
    payload
  );
  return response.data;
};
