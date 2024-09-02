// errorHandler.ts
import { toast } from "react-toastify";
import axios from "axios";

export const handleAxiosErrorHelper = (error) => {
  if (axios.isAxiosError(error)) {

    const axiosError = error;

    if (axiosError.response) {

      if (
        axiosError.response.data &&
        (axiosError.response.data.message || axiosError.response.data.error)
      ) {
        const backendError =
          axiosError.response.data.message || axiosError.response.data.error;
        toast.error(backendError);
      } else {
        toast.error("An unexpected error occurred");
      }
    } else {
      toast.error("An unexpected error occurred");
    }
  } else {
    toast.error("An unknown error occurred");
  }
};
