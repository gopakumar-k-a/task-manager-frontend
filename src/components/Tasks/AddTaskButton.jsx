import React from "react";
import { FiPlusCircle } from "react-icons/fi";

function AddTaskButton() {
  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add new Task
        <FiPlusCircle className="h-5 w-5 ml-2" />
      </button>
    </>
  );
}

export default AddTaskButton;
