import React, { useState } from "react";
import { FaTrash } from "react-icons/fa6";

const DeleteButton = ({ onDelete, _id }) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = () => {
    setShowConfirmDialog(false);
    onDelete(_id); 
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <button
        onClick={handleDeleteClick}
        className="relative flex items-center justify-start w-28 h-10 px-5 py-0 bg-red-600 text-white font-medium cursor-pointer rounded-lg transition duration-300 hover:scale-110 active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_rgb(140,32,212)]"
      >
        Delete
        <FaTrash className="w-5 h-5 absolute right-0 mr-5 fill-current transition duration-300" />
      </button>

      {showConfirmDialog && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg text-center">
            <p className="mb-4 break-words">
              Are you sure you want to delete this item? 
              <br/>
              (since you are the
              owner of the task you can only delete it)
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteButton;
