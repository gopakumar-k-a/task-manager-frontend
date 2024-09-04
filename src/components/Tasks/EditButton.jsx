import React from "react";
import { PiPencilBold } from "react-icons/pi";
const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="relative flex items-center justify-start w-24 h-10 px-5 py-0 bg-purple-600 text-white font-medium cursor-pointer rounded-lg  transition duration-300 hover:scale-110 active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_rgb(140,32,212)]"
    >
      Edit
      <PiPencilBold className="w-5 h-5 absolute right-0 mr-5 fill-current transition duration-300 " />
    </button>
  );
};

export default EditButton;
