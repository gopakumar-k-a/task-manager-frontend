import React from "react";
import ResetPassword from "./ResetPassword";
import { useSelector } from "react-redux";
function ProfleCard() {
  const { credentials } = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-11/12 sm:w-4/12 rounded-lg border-2 border-indigo-500 bg-transparent p-4 text-center shadow-lg dark:bg-gray-800">
          <figure className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 dark:bg-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              fill="currentColor"
              className="bi bi-person-fill text-white dark:text-indigo-300"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            </svg>
            <figcaption className="sr-only">John Doe, Web Developer</figcaption>
          </figure>
          <h2 className="mt-4 text-xl font-bold text-indigo-600 dark:text-indigo-400 break-words">
            {credentials.email}
          </h2>

          <div className="flex items-center justify-center">
            <ResetPassword />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfleCard;
